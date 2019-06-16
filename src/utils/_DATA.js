const fruits = [
  {
    name: "Apples",
    types: [
      {
        name: "Fuji",
        deliciousnessData: [
          {
            unixTimestamp: 1560642423,
            deliciousness: 4
          },
          { 
            unixTimestamp: 1560642422,
            deliciousness: 3
          },
          { 
            unixTimestamp: 1560642421,
            deliciousness: 2.2
          }
        ]
      },
      {
        name: "Crisp",
        deliciousnessData: [
          {
            unixTimestamp: 1560642423,
            deliciousness: 2.2
          },
          { 
            unixTimestamp: 1560469623,
            deliciousness: 3
          },
          { 
            unixTimestamp: 1560210423,
            deliciousness: 4
          }
        ]
      }
    ]
  },
  {
    name: "Oranges",
    types: [
      {
        name: "yellow",
        deliciousnessData: []
      },
      {
        name: "green",
        deliciousnessData: [1, 2, 3]
      }
    ]
  },
  {
    name: "Pears",
    types: [
      {
        name: "red",
        deliciousnessData: [1, 2]
      },
      {
        name: "yellow",
        deliciousnessData: [1, 2, 3]
      }
    ]
  }
];

export default fruits;
