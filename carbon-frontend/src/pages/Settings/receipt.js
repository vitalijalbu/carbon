const receipt = {
    id: "2041",
    area_name: "Brescia due",
    status: "Consegnato",
    status_id: 7,
    status_color: "#27944f",
    type: "delivery",
    created_at: "21 Novembre 2021",
    pickup_ready: null,
    dropoff_ready: null,
    dropoff_deadline: "12:30",
    dropoff_delivered: "15:35",
    delivered: true,
    notes: "Note demo qui API",
    payment_method: "credit_card",
    total_price: "48.25",
    subtotal_price: "48.00",
    delivery_fee: "0.00",
    purchase_fee: "0.25",
    fees: {
      delivery_fee: "0.00",
      purchase_fee: "0.25"
    },
    currency_code: "€",
    pickup: {
      id: "1000",
      name: "Zushi Japanese Restaurants",
      phone_number: "12211232141",
      formatted_address: "Viale Venezia, 40, 25100 Brescia BS",
      detailed_address: {
        street_address_1: "Viale Venezia, 40",
        street_address_2: null,
        city: "Brescia",
        zip_code: "25100"
      }
    },
    dropoff: {
      id: "88",
      name: "Nuova rubrica",
      image_url: "https://cdn.ceebo.com/assets/images/avatar.png",
      notes: null,
      phone_number: "3295986472",
      formatted_address: "Viale Venezia, 62, 25123 Brescia BS",
      detailed_address: {
        street_address_1: "Viale Venezia",
        street_address_2: "62",
        city: "Brescia",
        zip_code: "25123"
      },
      location: {
        lat: 45.5349953,
        lng: 10.2357292
      }
    },
    courier: {
      id: "1018",
      image_url: "https://cdn.ceebo.com/assets/images/avatar.png",
      full_name: " ",
      phone_number: null,
      email: "v.jalbu31@gmail.ca"
    },
    items: [
      {
        id: "1081",
        name: "Zuppa di miso",
        qty: "1",
        currency_code: "€",
        total_price: 7,
        unit_price: "4.00",
        special_instructions: null,
        variants: [
          {
            id: "3754",
            name: "Demo 3",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "1.00"
          },
          {
            id: "3755",
            name: "Demo 4",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "2.00"
          },
          {
            id: "3756",
            name: "Demo",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "0.00"
          },
          {
            id: "3757",
            name: "Sprite",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "0.00"
          }
        ]
      },
      {
        id: "1076",
        name: "Riso bianco con sesamo",
        qty: "1",
        currency_code: "€",
        total_price: 33,
        unit_price: "33.00",
        special_instructions: "riso ben cotto grazie",
        variants: []
      },
      {
        id: "1081",
        name: "Zuppa di miso",
        qty: "1",
        currency_code: "€",
        total_price: 8,
        unit_price: "4.00",
        special_instructions: null,
        variants: [
          {
            id: "3758",
            name: "Demo 4",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "2.00"
          },
          {
            id: "3759",
            name: "Demo 5",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "2.00"
          },
          {
            id: "3760",
            name: "Demo",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "0.00"
          },
          {
            id: "3761",
            name: "Sprite",
            qty: "1",
            per_item: "1",
            currency_code: "€",
            price: "0.00"
          }
        ]
      }
    ],
    total_items: 3
  };

  export default receipt;