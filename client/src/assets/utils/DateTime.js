const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const TweetDateTime = time => {
  const d = new Date(time)
  return (
    months[d.getMonth()] +
    ' ' +
    d.getDate() +
    ' ' +
    d.getFullYear() +
    ' ' +
    getTime(d.getHours(), d.getMinutes(), d.getSeconds())
  )
}

const getTime = (hour, min, sec) => {
  return hour > 11
    ? String(parseInt(hour) - 11) + ':' + min + ':' + sec + 'pm'
    : String(parseInt(hour) + 1) + ':' + min + ':' + sec + 'am'
}

export { TweetDateTime }
