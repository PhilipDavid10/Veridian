export default function getDayOfTheWeek(): string{
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let date = new Date()
    let day = date.getDay()

    return dayNames[day] ?? "Can't display day of the week"
}