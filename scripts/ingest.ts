import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from '@google/genai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

// Initialize Clients
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const indexName = process.env.PINECONE_INDEX_NAME!;

import { embedMany } from 'ai';
import { createVertex } from '@ai-sdk/google-vertex';

// Initialize the Google Vertex AI client (same auth as the main app)
const vertex = createVertex({
    project: process.env.GOOGLE_CLOUD_PROJECT!,
    location: process.env.GOOGLE_CLOUD_LOCATION!,
});

const { PDFParse } = require('pdf-parse');

async function main() {
    console.log('Starting ingestion pipeline...');

    // Read Resume/portfolio Data
    const filePath = path.join(process.cwd(), 'public', 'Bhagyesh_Resume.pdf');
    const dataBuffer = fs.readFileSync(filePath);
    const pdf = new PDFParse(new Uint8Array(dataBuffer));
    const result = await pdf.getText();
    const text: string = result.text;

    // Smart Chunking (Optimizing for low-latency retrieval)
    // We chunk by 500 characters with a 50-character overlap so context isn't lost between chunks.
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const chunks = await splitter.createDocuments([text]);
    console.log(`Generated ${chunks.length} chunks from the document.`);

    // Connect to Pinecone
    const index = pc.Index(indexName);
    const vectorsToUpsert: Array<{ id: string; values: number[]; metadata: { text: string; source: string } }> = [];

    // Generate Embeddings & Prepare Vectors
    console.log(`Generating embeddings for ${chunks.length} chunks...`);
    const chunkTexts = chunks.map(chunk => chunk.pageContent);

    // Use the new Vercel AI SDK to generate embeddings in bulk
    const { embeddings } = await embedMany({
        model: vertex.textEmbeddingModel('text-embedding-005'),
        values: chunkTexts,
    });

    for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i].pageContent;
        const embeddingValues = embeddings[i];

        if (!embeddingValues) {
            console.error(`Failed to generate embedding for chunk ${i}`);
            continue;
        }

        // Package the data for Pinecone
        vectorsToUpsert.push({
            id: `chunk-${i}`,
            values: embeddingValues,
            metadata: {
                text: chunkText,    // Store the raw text so we can give it to the LLM later
                source: 'resume.pdf'
            }
        });
    }

    // Upsert to Pinecone in a single batch
    console.log(`Upserting ${vectorsToUpsert.length} vectors to Pinecone...`);
    await index.upsert({ records: vectorsToUpsert });
    console.log('Ingestion complete!');
}
main().catch(console.error);