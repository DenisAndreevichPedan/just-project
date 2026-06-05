export function StatusBadge ({status}) {
    const dotColor = status === "open" 
    ? "blue" 
    : status === "in_progress" 
    ? "yellow" 
    : "green"

    
    return (<div>
        <div 
        style={{
            display: "inline-block", 
            width: "5px", 
            height: "5px", 
            borderRadius: "50%", 
            background: dotColor,
            marginRight: "5px"
        }}
        ></div>
        <span>{status}</span>
    </div>)
}