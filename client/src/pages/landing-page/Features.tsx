import React from 'react'
import { BentoGrid, BentoCard } from "../../components/magicui/bento-grid";
import { IconPencil, IconSearch, IconRoad, IconUsers, IconBulb } from '@tabler/icons-react';


const features = [
    {
        Icon: IconPencil,
        name: "Write & Branch",
        description: "Create the first node of your story and watch it branch into infinite possibilities.",
        href: "/",
        cta: "Learn more",
        background: <img src={writeBranchImage} className="absolute -top-50 mt-5" alt="Write & Branch" />,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: IconSearch,
        name: "Explore Stories",
        description: "Dive into a vast universe of interconnected tales crafted by our community.",
        href: "/",
        cta: "Learn more",
        background: <img src={exploreImage} className="absolute -top-20 mt-5" alt="Explore Stories" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: IconRoad,
        name: "Choose Your Path",
        description: "Navigate through branching narratives and shape the story as you read.",
        href: "/",
        cta: "Learn more",
        background: <img src={choosePathImage} className="absolute -top-20" alt="Choose Your Path" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: IconUsers,
        name: "Collaborate",
        description: "Join forces with other writers to create expansive story worlds.",
        href: "/",
        cta: "Learn more",
        background: <img src={collaborateImage} className="absolute -top-20" alt="Collaborate" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: IconBulb,
        name: "Get Inspired",
        description: "Spark your creativity with unique narratives.",
        href: "/",
        cta: "Learn more",
        background: <img src={inspiredImage} className="absolute -top-20" alt="Get Inspired" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];

// Import images
import collaborateImage from '../../assets/images/landing-page/collaborate.svg';
import exploreImage from '../../assets/images/landing-page/explore.svg';
import choosePathImage from '../../assets/images/landing-page/choose_path.svg';
import writeBranchImage from '../../assets/images/landing-page/write_branch.svg';
import inspiredImage from '../../assets/images/landing-page/inspired.svg';

const Features = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 mb-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">


                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
                        Your Story, <span className='text-accent'>Reimagined</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Experience a new era of storytelling where every choice leads to a new adventure, and every writer can leave their mark.
                    </p>
                </div>

                <div className="mt-16">
                    <BentoGrid className="lg:grid-rows-3">
                        {features.map((feature) => (
                            <BentoCard key={feature.name} {...feature} />
                        ))}
                    </BentoGrid>
                </div>
            </div>
        </div>
    )
}

export default Features