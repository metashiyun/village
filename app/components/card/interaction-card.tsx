import React from "react";

const InteractionCard = ({title, subtitle, children}: {
    title: string,
    subtitle: string,
    children?: React.ReactNode
}) => {
    return <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
        <h3 className="text-2xl text-center mb-2 dark:text-white">
            {title}
        </h3>
        <p className="my-2 text-center text-sm text-gray-500 dark:text-gray-300">
            {subtitle}
        </p>
        {children}
    </div>
}

export default InteractionCard