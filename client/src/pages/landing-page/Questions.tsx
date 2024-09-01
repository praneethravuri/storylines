import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

const faq = [
    {
        question: "How does the branching story system work?",
        answer: "Our platform allows writers to create story nodes that can branch off in multiple directions. Readers can choose which path to follow, effectively co-creating the narrative as they go."
    },
    {
        question: "Can I collaborate with other writers on a single story branch?",
        answer: "Absolutely! You can invite other writers to contribute to your story nodes or join existing collaborative projects. This creates a rich, diverse narrative tapestry."
    },
    {
        question: "How do I keep track of all the story branches I've created or explored?",
        answer: "We provide a personalized dashboard that visualizes your story map, showing all the nodes you've created or explored. It's like your own literary constellation!"
    },
    {
        question: "Is there a rating or feedback system for story contributions?",
        answer: "Yes, we have a community-driven rating system where readers can upvote their favorite story nodes and leave constructive feedback. This helps highlight quality content and encourages writers to improve their craft."
    },
    {
        question: "Are there any content guidelines or restrictions?",
        answer: "We encourage creativity but also maintain a safe and inclusive environment. We have community guidelines that prohibit explicit content, hate speech, and copyright infringement. All content should be original or properly attributed."
    },
    {
        question: "How can I get started if I'm new to creative writing?",
        answer: "StoryLines is perfect for beginners! You can start by exploring existing stories, contributing to open branches, or starting a simple story node. We also provide writing prompts and tutorials to help you get started."
    }
]

const Questions = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-foreground">
            <div className="container mx-auto px-4 w-full">
                <div className="text-center">
                    <div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-8">
                            Frequently Asked Questions
                        </h1>
                    </div>
                    <Accordion type="single" collapsible className="w-full md:w-2/3 mx-auto">
                        {faq.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className='text-left'>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Questions