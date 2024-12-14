export const COLUMNS = [
    {display_name: "S.No.", key: "s.no",  }, 
    {display_name: "Percentage funded", key: "percentage.funded" , formatter: (val, maxlen) => `${val}`.padStart(maxlen, " "),  }, 
    {display_name: "Amount pledged", key: "amt.pledged", formatter: (val, maxlen) => `${val}`.padStart(maxlen, " ") }
]