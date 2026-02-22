import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ChatButton from "@/components/ChatButton";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
                <Research />
                <Projects />
                <Skills />
                <Education />
                <Contact />
            </main>
            <ChatButton />
        </>
    );
}
