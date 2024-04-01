import React from "react";

const InfoCard = ({title, subtitle, children}: {
    title: string,
    subtitle: string,
    children: React.ReactNode
}) => {
    return <div className="mt-4 p-4 bg-white dark:bg-gray-900 max-w-4xl mx-auto sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                {subtitle}
            </p>
        </div>
        <div className="dark:text-white">
            {children}
        </div>
    </div>
}

export default InfoCard