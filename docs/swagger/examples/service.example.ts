const tagItemListExample = [
  {
    id: 1,
    name: "手繪",
    type: "TECHNIQUE",
    slug: "illustration",
  },
  {
    id: 2,
    name: "日系可愛",
    type: "STYLE",
    slug: "jp-cute",
  },
];

const serviceItemExample = {
  "id": 1,
  "name": "日系可愛插畫",
  "imgUrl": "https://www.exampleImg.com/fefw",
  "durationMin": 60,
  "basePrice": 900,
}

const serviceWithTagExample = {
  "id": 1,
  "name": "日系可愛插畫",
  "basePrice": 900,
  "durationMin": 60,
  "imgUrl": "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "isActive": true,
  "tags": [
      {
          "id": 10,
          "name": "手繪",
          "type": "TECHNIQUE",
          "slug": "illustration"
      },
      {
          "id": 2,
          "name": "日系可愛",
          "type": "STYLE",
          "slug": "jp-cute"
      }
  ]
}

const servicesWithTagExample = [
  {
      "id": 1,
      "name": "日系可愛插畫",
      "basePrice": 900,
      "durationMin": 60,
      "imgUrl": "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "isActive": true,
      "tags": [
          {
              "id": 10,
              "name": "手繪",
              "type": "TECHNIQUE",
              "slug": "illustration"
          },
          {
              "id": 2,
              "name": "日系可愛",
              "type": "STYLE",
              "slug": "jp-style"
          }
      ]
  },
  {
      "id": 2,
      "name": "氣質法式",
      "basePrice": 1200,
      "durationMin": 90,
      "imgUrl": "https://images.unsplash.com/photo-1667207229737-0adf3c700d5e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "isActive": true,
      "tags": [
          {
              "id": 7,
              "name": "法式",
              "type": "TECHNIQUE",
              "slug": "french"
          },
          {
              "id": 4,
              "name": "氣質裸色",
              "type": "STYLE",
              "slug": "skin-color"
          }
      ]
  },
  {
      "id": 3,
      "name": "自然延甲",
      "basePrice": 1200,
      "durationMin": 90,
      "imgUrl": "https://images.unsplash.com/photo-1553375385-2d9820966cdb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "isActive": true,
      "tags": [
          {
              "id": 8,
              "name": "延甲",
              "type": "TECHNIQUE",
              "slug": "extension"
          },
          {
              "id": 1,
              "name": "韓式簡約",
              "type": "STYLE",
              "slug": "kr-style"
          }
      ]
  }
]

export const serviceExamples = {
  tagItemListExample,
  serviceWithTagExample,
  servicesWithTagExample,
  serviceItemExample,
}