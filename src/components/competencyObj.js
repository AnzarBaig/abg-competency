const competencyObj = {
    competencies: [
        {
            id: "customer",
            title: "Champion Customer to Create Value",
            themes: [
                {
                    id: "customer_1",
                    title: "Anticipates and shapes customers' stated and unstated needs and behaviors",
                    behaviors: [
                        {
                            band: "JB 9-11",
                            level: "Fostering Individual Excellence",
                            description: "Proactively seeks input from various customers to understand their needs",
                        },
                        {
                            band: "JB 6-8",
                            level: "Elevating Team Excellence",
                            description: "Engages with customers, understands customer segment needs and clarifies them for the team",
                        },
                        {
                            band: "JB 4-5",
                            level: "Elevating Functional Excellence",
                            description: "Understands various customer segments and their needs, aligns team's efforts towards addressing the same",
                        },
                        {
                            band: "JB 1-3",
                            level: "Championing Organizational Excellence",
                            description: "Partners with various customer segments to co-create solutions and strategies that address their needs",
                        },
                        {
                            band: "BD-BH/Exec",
                            level: "Enterprise Builder",
                            description: "Makes strategic investments based on changing customer needs/preferences and create new segments for sustainable value creation",
                        },
                    ],
                },
                {
                    id: "customer_2",
                    title: "Focuses on enhancing customer service and experience",
                    behaviors: [
                        {
                            band: "JB 9-11",
                            level: "Fostering Individual Excellence",
                            description: "Provides exceptional customer service consistently and strives to find ways to enhance it",
                        },
                        {
                            band: "JB 6-8",
                            level: "Elevating Team Excellence",
                            description: "Builds relationships with the customer to strengthen partnership; reviews team's outcomes and progress to ensure optimal customer satisfaction",
                        },
                        {
                            band: "JB 4-5",
                            level: "Elevating Functional Excellence",
                            description: "Creates strong strategies to significantly enhance customer delight and build competitive advantage",
                        },
                        {
                            band: "JB 1-3",
                            level: "Championing Organizational Excellence",
                            description: "Encourages teams to create opportunities to differentiate the brand through unique customer experiences",
                        },
                        {
                            band: "BD-BH/Exec",
                            level: "Enterprise Builder",
                            description: "Integrates customer insights into strategic plans and enhance customer experience at the organizational level",
                        },
                    ],
                },
            ],
        },
        {
            id: "adapt",
            title: "Adapt and Respond Proactively",
            themes: [
                {
                    id: "adapt_1",
                    title: "Is flexible and embraces change wholeheartedly",
                    behaviors: [
                        {
                            band: "JB 9-11",
                            level: "Fostering Individual Excellence",
                            description: "Is curious and takes initiative to explore alternatives to optimize deliverables",
                        },
                        {
                            band: "JB 6-8",
                            level: "Elevating Team Excellence",
                            description: "Welcomes change and guides the team to adapt",
                        },
                        {
                            band: "JB 4-5",
                            level: "Elevating Functional Excellence",
                            description: "Encourages improvements in work practices, and supports their implementation; shares experiences with others to ensure smooth transition",
                        },
                        {
                            band: "JB 1-3",
                            level: "Championing Organizational Excellence",
                            description: "Identifies opportunities to drive change and enables teams to lead such initiatives",
                        },
                        {
                            band: "BD-BH/Exec",
                            level: "Enterprise Builder",
                            description: "Proactively prepares the organization for future shifts in business environment",
                        },
                    ],
                },
            ],
        },
    ],
    jobBands: [
        {
            id: "jb_9_11",
            band: "JB 9-11",
            level: "Fostering Individual Excellence",
        },
        {
            id: "jb_6_8",
            band: "JB 6-8",
            level: "Elevating Team Excellence",
        },
        {
            id: "jb_4_5",
            band: "JB 4-5",
            level: "Elevating Functional Excellence",
        },
        {
            id: "jb_1_3",
            band: "JB 1-3",
            level: "Championing Organizational Excellence",
        },
        {
            id: "bd_bh",
            band: "BD-BH/Exec",
            level: "Enterprise Builder",
        },
    ],
};

export default competencyObj;
