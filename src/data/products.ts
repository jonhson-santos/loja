import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'whey-1',
    name: 'Gold Standard 100% Whey',
    price: 'R$ 249,90',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBusyrxEoi-ECyGzm9ZB3PzHd8MeMzgx_wvqeiOmmCMhZWyh0EanXgOOA7uyhFqZzWKz4lONVh3YwfnBnitQxfO1ISrVwIcV8uw-fAVVlYJD8xtPdFEiSVsX21PXQGaglKJy4n8V0yTpUtRMCxz4zO7dU8vjREod9Ae2ZHtgthfJba_g433CoNEXj_UgqXjNefOHYFNBiH3qN6fTc5m8TO9gdV7KxDgrgjKAnyfPQ6EIptLGwVPIdMbR0E9H9fwxbZmW4uj3EnRpJM',
    affiliateUrl: 'https://exemplo.com/whey-1',
    category: 'Ofertas do Dia',
    brand: 'Optimum Nutrition',
    inStock: true,
    specialOffer: 'Oferta Especial'
  },
  {
    id: 'whey-2',
    name: 'ISO100 Hydrolyzed Whey',
    price: 'R$ 319,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB936pgnTODQpUoxzDo-4SyrYQTJ7MDo39Z79C3lJBuDYDhbkLcYhGbEx_HeFwnHwTw3SKNQIfJtCuHvcUjl_UrRlZhN9VUnxc0lEgAWshRRoZXiXuQlGW16OXOh578YZQ9M44MzIjyMFm3hHkpVX4Ah1l-fdZppkaXrSHxXzN50UP7gCFdDvRr7nEPtOg8trx9cdXW7AWL75ikzeHBw9O67rwEuhrzKSwTiWqtdUZkRHYJue2g7jD9uyZyBzWWDhdhNZkb68z7RCw',
    affiliateUrl: 'https://exemplo.com/whey-2',
    category: 'Novidades',
    brand: 'Dymatize',
    inStock: true,
    bestSeller: true
  },
  {
    id: 'whey-3',
    name: 'Nitro-Tech Performance',
    price: 'R$ 289,90',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbuVXAMsowNTgU-LnDRA-ckvUoX_ZrKQV-57CtP55uyGODtBUtNIPIH1EcQHDbLikxvlwSVmJbALpwtlmrOYXLlUHhLSm_CrpLbdttbk5kl4yf0LpUGp3Ou9xiWORxbTUGt-elyh4SUdlk6VeGz3hLPZS74B82cCfaSgu7JCl80d1inwYQnqFRfKP1NFg0gPDeLfBstCwod1v6Gs3odLe4kXwDyLJOVzNWXPX60-A02Hvy7-IuX3OUfuOKLl0q8ZGVS1MzlA_EdBw',
    affiliateUrl: 'https://exemplo.com/whey-3',
    category: 'Whey Protein',
    brand: 'MuscleTech',
    inStock: false
  },
  {
    id: 'whey-4',
    name: 'Impact Whey Isolate',
    price: 'R$ 199,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz7XHOBYRyeOkh6X3ASOa8b1u_BziS10i1eg8qGbZJX0mz-dGWL3WlQUhCKNkYnFBh9PgBz_-iHu4v8-vq-TeGuphZsO6hLUb1vTQ7w1A40UfAMWPgoODhxb4feM_YvWe7TjrLo3QsaSX_vxYxxWuFV8vMqYt49LVmhdm6CsTomFyMerpyjTEplp7m2bZjET7wy_wbRQM9MT3MjTpIkohhD2pehwXCmNmhuGUPH_GZ0uTHsPBNG_9yvX22-zWqXIsYuyAUsZH303g',
    affiliateUrl: 'https://exemplo.com/whey-4',
    category: 'Whey Protein',
    brand: 'MyProtein',
    inStock: false
  },
  {
    id: 'creatina-1',
    name: 'Creatina 300g',
    price: 'R$ 124,90',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrlmWRRGhPACzE0CjMtEzCwCP4vwJGtbX-o9-TVNVrOP_hMnUDOoAgb0wTuh_0hsMOgc86AMiZnCwF4sENfTTLRkHrs1ccmABErYJH8Q--78JvjgvNZxj7s0_GeXgGhTt1E9OXb0zK_19JhuePUg5zXIq3qgT9dvDF-P30P7a43xnymI2rV6qH0Lkslo6ovSxzV19-X99XkG2hfxZeyCawqcbqtmrfieJnRoDSOONIgywBcSfv2R1uQ-q65CI4xM7Z5FOi4ir9gAc',
    affiliateUrl: 'https://exemplo.com/creatina-1',
    category: 'Creatina',
    brand: 'Creapure',
    inStock: false
  },
  {
    id: 'creatina-2',
    name: 'Creatine Ultra',
    price: 'R$ 159,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS3nhft0_Nc9NmwkXsfy0lqkmCWdHGff6SHQ4p8VT5voPgYtlZPEpm-8l01hjvg4-fojlRcYMIZTjkwp7NsD_zST13i2i9tJPeGz5Tmj42A5PiWms6BEycpn78bz9ZDQkwc9sHk9v6wbOYjxjzHZE9O1uF03Zlc50BwhfCAtqsucOAIWY4kbuZlkVhUMEl-rz9F0rOsdGK1LxBVcoQAnEQijLlaUjW5zSGminT9Knhs6YSl0nj-o-28pm8wBgwctyT-HD0YrM7wKo',
    affiliateUrl: 'https://exemplo.com/creatina-2',
    category: 'Creatina',
    brand: 'Applied Nutrition',
    inStock: false
  },
  {
    id: 'creatina-3',
    name: 'Creatine 5000',
    price: 'R$ 189,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS3nhft0_Nc9NmwkXsfy0lqkmCWdHGff6SHQ4p8VT5voPgYtlZPEpm-8l01hjvg4-fojlRcYMIZTjkwp7NsD_zST13i2i9tJPeGz5Tmj42A5PiWms6BEycpn78bz9ZDQkwc9sHk9v6wbOYjxjzHZE9O1uF03Zlc50BwhfCAtqsucOAIWY4kbuZlkVhUMEl-rz9F0rOsdGK1LxBVcoQAnEQijLlaUjW5zSGminT9Knhs6YSl0nj-o-28pm8wBgwctyT-HD0YrM7wKo',
    affiliateUrl: 'https://exemplo.com/creatina-3',
    category: 'Creatina',
    brand: 'Platinum',
    inStock: false
  },
  {
    id: 'pre-treino-1',
    name: 'C4 Original',
    price: 'R$ 189,90',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOZ0SkvpG2f4PgsdIlToNjoWavbnLyH7xOxGus-MyBwskQsZnLD5GnezgYRikyQAYZ0bf1X8t1z0qCvMEp3U7ZrZ3wzDgvsOiULl2hdTS1OheA7tIV3kwBGmhBJUqJ6KXvHaI07TS_4L-2-n2z_l9hQC5l3j-JybHD2ptBEJ83xRQXLTGcyN2ny65kPLngWiexhbv7L97CVI3Uk3cf88gJ3_NjRM-0bvVNfwhYKLTg9DkYvVg2JCdMXDIZqkaAwfGX6KmuXJWzpSM',
    affiliateUrl: 'https://exemplo.com/pre-treino-1',
    category: 'Pré-treino',
    brand: 'Featured Launch',
    inStock: true
  },
  {
    id: 'pre-treino-2',
    name: 'High Matrix',
    price: 'R$ 254,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLJNYYY_Fl7k48V8bzEevVfn9hmAuBtuxkntZfWmQdL4HBLCuuk_E7VFmwvWEL8S81YL7M3nQalUp51ImKSlHcjYrIUe6UHNuS0fzrkzHksYwXajjV3sKJF11d6P8eZg_nBzgZDc2jIMibHbHRFV07UhZS5pKzWcvW8fz4xXj56gwr0pNupOa1qMzyM7lCzimfx4s-8oYq9VUNReRDKTO4hHo0FBoHrb-NhhQbKih_yIKjSMdR0ZnKD2Dpq2Wkxi0ezqQKKKp8U48',
    affiliateUrl: 'https://exemplo.com/pre-treino-2',
    category: 'Pré-treino',
    brand: 'Pre-JYM',
    inStock: true
  },
  {
    id: 'vitamina-1',
    name: 'Multivitamínico',
    price: 'R$ 89,90',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBlNnPxhxRphZu3yV86tcEQNB4ZBf5OPZen4_s9uPKzQAoKDrFKpg11QJ2w8CQk1gWET1t1UkeF2Ks7Fh9U9ksms0a24U6P3FXOqZ7DUhAE1_E9OXQ0gzN16VEXmoRrL9eYo3rqINcq6UaxjYVyJI67DGxoyOLd3C_9lfSq2Jtgqdf0MQbQTjFwMihfTQjNLG9ixqZvcvS7wcXfdN_U1pWkXCBFM6ZmRLhGIGR_OKtALJq_aK3Ye-D-AHKtoKWpqFoT0ePwWFlUY',
    affiliateUrl: 'https://exemplo.com/vitamina-1',
    category: 'Vitaminas',
    inStock: true
  },
  {
    id: 'vitamina-2',
    name: 'Omega 3 Ultra',
    price: 'R$ 115,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd8kJMDWgaLaT-ag-51lnjesgo1BDrn8VKRt-k3GgZ535knRUfsPXnTPizqKpCnMCIs0gsgGpZSieCrp704_aSd3gBVX-3R38MxdS0mWkonQEocTn1hp-QP4t6tc5VfEiyaQcCo5MuhywL4F7XU_ouM2A1Geu6GB3jAxqFLMiK3YW8NF76ubng95Aqv4kGOk9uVck8_7r2VMI3ZdIxrhNH5Zw57SkCniULBHPd8jXu6SJmcbfXh-Gu-ZwY72QIEvFadwHjw1rji0c',
    affiliateUrl: 'https://exemplo.com/vitamina-2',
    category: 'Vitaminas',
    inStock: true
  },
  {
    id: 'roupa-1',
    name: 'Legging Sculpt Pro',
    price: 'R$ 179,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDakSuf3BmniS1-VpNw3ihhohV-8AZBMis2YPsVVhqZ44iutjwNwkWH--JwJV2wZgs979j1JMUzm23T64sU6vIpMpMHUI0mANp9ziu1gjeVNI2zMLYqVnI93c4Mi0NVaCbarDGDbLIW-3unLamphsZFlwh8Gb6XcQnoG6CGrfoaac1wGAFko2eIsimJ45mm_fXLvn3DR_alBRMpskqPSDNiF0Ii82S_wYwLOBIDA9z1E3n0gZKvsWkPbcrjZy1qdjOhngGx344TNso',
    affiliateUrl: 'https://exemplo.com/roupa-1',
    category: 'Roupas',
    brand: 'Charcoal Black',
    inStock: true
  },
  {
    id: 'roupa-2',
    name: 'Dry-Fit Elite T-Shirt',
    price: 'R$ 95,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHC1UdNbr1NYIEBF3O0smCwVEnZzOASO7GEM_aP3fSe_VEdl4Q9TAaC7Lp3DODMvFRpfBcmwKfNZ0_FddnEVxiMymIoNCo0zr8zwQnfnVlH07hrbupEIyasoDq6ytvkawia3mLuYS6Y17-Hl9KvJs9ntyfPXQMLJWm6A3gMoVL-NnikG19YZKSPjl6oK00DL2SEgkAgtk6JFQl1PB5HaMy0VsPpKmN8k6NA2_uHOOr4LVi9a-mT9qXpEiYzykOltA26wkggTPkHDo',
    affiliateUrl: 'https://exemplo.com/roupa-2',
    category: 'Roupas',
    brand: 'Electric Blue',
    inStock: true
  },
  {
    id: 'acessorio-1',
    name: 'Stainless Shaker 700ml',
    price: 'R$ 65,00',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYhurQq3OHjMRhoy1yApUS1ys1QXcGGXT_DHYLsk2JDAWq6zkxh_Cmwvk_H5PdQzsbU42J-ofgHuba16gu-qectmatwq_kugHA33TFPq_cuPn77ViNvyM6MUSsqfc6t-5XlQmsvZBwrurCsOynmlH_pFvIsVzv_FLzppgVhPhP5L97QxUkxh3uV-ST3U3gm7pBL1n81HvfZnSRD6bG-63HPCq2jZkT6XjExTEGmsuk4GgYEg0dZoA_Lx4EOgT8zxWFuyVYKINR0ek',
    affiliateUrl: 'https://exemplo.com/acessorio-1',
    category: 'Acessórios',
    brand: 'Matte Black',
    inStock: true
  }
];
