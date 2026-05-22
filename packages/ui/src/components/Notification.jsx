export function Notification ({text}) {

    return <div style={{position: "absolute", right: '5px', top: '5px', backgroundColor: 'red', zIndex: '1000'}}>{text}</div>
}