export interface OrderData {
    id: string;
    name: string;
    number: string;
    orderNumber: string;
    orderSumm: string;
    address: string;
    description: string;
    restourantAddress: string;
    deliveryTime: string;
    location: {
        lat: string;
        lng: string;
    };
}

export const ordersNearby: OrderData[] = [
    {
        id: "1",
        name: "Kulikov",
        number: "+996500353529",
        orderNumber: '23145-12438414',
        orderSumm: '960',
        address: 'ул.Ахунбаева',
        description: 'д2 между 8 и 9 подъездом цокольный этаж рядом вывеска КУЛИКОВ',
        restourantAddress: 'Город Бишкек, улица Ахунбаева, 28',
        deliveryTime: '1 час 10 минут',
        location: {
            lat: '42.8746',
            lng: '74.5698'
        }
    },
    {
        id: "2",
        name: "Smirnov",
        number: "+996700123456",
        orderNumber: '23145-12438415',
        orderSumm: '1250',
        address: 'пр.Чуй',
        description: 'д105 напротив ТЦ Бишкек Парк, 3 этаж, кв. 45',
        restourantAddress: 'Город Бишкек, проспект Чуй, 105',
        deliveryTime: '45 минут',
        location: {
            lat: '42.8755',
            lng: '74.5965'
        }
    },
    {
        id: "3",
        name: "Petrov",
        number: "+996555987654",
        orderNumber: '23145-12438416',
        orderSumm: '780',
        address: 'ул.Исанова',
        description: 'д75 возле магазина Фрунзе, 2 подъезд, домофон 25',
        restourantAddress: 'Город Бишкек, улица Исанова, 75',
        deliveryTime: '1 час 5 минут',
        location: {
            lat: '42.8656',
            lng: '74.5875'
        }
    },
    {
        id: "4",
        name: "Nazarov",
        number: "+996312456789",
        orderNumber: '23145-12438417',
        orderSumm: '1450',
        address: 'ул.Токтогула',
        description: 'д120 рядом с банком Айыл, вход со двора, 1 этаж',
        restourantAddress: 'Город Бишкек, улица Токтогула, 120',
        deliveryTime: '50 минут',
        location: {
            lat: '42.8798',
            lng: '74.5845'
        }
    },
    {
        id: "5",
        name: "Kadyrov",
        number: "+996777333222",
        orderNumber: '23145-12438418',
        orderSumm: '920',
        address: 'мкр.Джал',
        description: '12-1-45 зеленый дом с красными воротами',
        restourantAddress: 'Город Бишкек, микрорайон Джал, 12-1',
        deliveryTime: '1 час 20 минут',
        location: {
            lat: '42.8345',
            lng: '74.6198'
        }
    }
];


export interface Types {
    type: "onFoot" | "onVehicle" | "onBicycle" | "onCar";
}


export const selectTypes: Types[] = [
    {
        type: "onFoot",
    },
    {
        type: "onVehicle",
    },
    {
        type: "onCar",
    },
    {
        type: "onBicycle",
    },
]