// coulmns to display in table
export const COLUMNS = [
    {display_name: "S.No.", key: "s.no",  }, 
    {display_name: "Percentage funded", key: "percentage.funded" , formatter: (val, maxlen) => `${val}`.padStart(maxlen, " "),  }, 
    {display_name: "Amount pledged", key: "amt.pledged", formatter: (val, maxlen) => `${val}`.padStart(maxlen, " ") }
]

// all coulmns
export const ALL_COLUMNS = [
    { display_name: "S.No.", key: "s.no" },
    { display_name: "Title", key: "title"},
    { display_name: "Country", key: "country"},
    { display_name: "State", key: "state"},
    { display_name: "Location", key: "location"},
    { display_name: "Currency", key: "currency", },
    { display_name: "blurb", key: "blurb", },
    { display_name: "Funded by", key: "by", },
    { display_name: "Percentage funded", key: "percentage.funded", formatter: (val, maxlen) => `${val}`.padStart(maxlen, " "), },
    { display_name: "Amount pledged", key: "amt.pledged", formatter: (val, maxlen) => `${val}`.padStart(maxlen, " ") },
    { display_name: "Deadline", key: "end.time", formatter: (val, maxlen) => {
        const date = new Date(val);
        return `${date.getDay().toString().padStart(2,"0")}-${date.getMonth() +1}-${date.getFullYear()}`
    }}
]