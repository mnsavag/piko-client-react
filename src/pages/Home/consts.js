import { sortByPopularity, sortDate } from "../../utils/sortFunctions"

export const sortButtons = [ 
                            {   id: 1, 
                                title: "By Popularity", 
                                selected: true, 
                                sortField: "countPassed", 
                                sortFunc: sortByPopularity
                            }, 
                            {   id: 2, 
                                title: "Newest", 
                                selected: false, 
                                sortField: "createdDate", 
                                sortFunc: sortDate
                            }
                        ]