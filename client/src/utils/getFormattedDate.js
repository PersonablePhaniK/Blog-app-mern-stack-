const getFormattedDate = date => {
    return new Date(Date.parse(date)).toLocaleDateString("en-US", {
        dataStyle: "long"
    })
}

export default getFormattedDate;