import React from "react";

const LabelComponent = ({ text, htmlFor }: { text: string; htmlFor: string }) => {
    return <label htmlFor={htmlFor} className="text-sm text-gray-900">{text}</label>
}

const TextLabel = React.memo(LabelComponent)

export default TextLabel