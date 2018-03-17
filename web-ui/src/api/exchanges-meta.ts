export interface ExchangeMetaInformation {
  avatarSm?: string;
  avatarLg?: string;
  bannerSm?: string;
  bannerLg?: string;
}

export const exchangeMetaMappings: {[key: string]: ExchangeMetaInformation} = {
  BINANCE: {
    avatarSm: 'https://pbs.twimg.com/profile_images/962617686789308416/HoWGYT0I_80x80.jpg',
    avatarLg: 'https://pbs.twimg.com/profile_images/962617686789308416/HoWGYT0I_400x400.jpg',
    bannerSm: 'https://pbs.twimg.com/profile_banners/877807935493033984/1518340904/600x200',
    bannerLg: 'https://pbs.twimg.com/profile_banners/877807935493033984/1518340904/1500x500',
  },
  BITTREX: {
    avatarSm: 'https://pbs.twimg.com/profile_images/552616908093001728/97DIMDFd_80x80.png',
    avatarLg: 'https://pbs.twimg.com/profile_images/552616908093001728/97DIMDFd_400x400.png',
    bannerSm: 'https://pbs.twimg.com/profile_banners/2309637680/1420589155/600x200',
    bannerLg: 'https://pbs.twimg.com/profile_banners/2309637680/1420589155/1500x500',
  },
  GDAX: {
    avatarSm: 'https://pbs.twimg.com/profile_images/890442816748474368/iX_5iL_8_80x80.jpg',
    avatarLg: 'https://pbs.twimg.com/profile_images/890442816748474368/iX_5iL_8_400x400.jpg',
    bannerSm: 'https://pbs.twimg.com/profile_banners/720487892670410753/1501134308/600x200',
    bannerLg: 'https://pbs.twimg.com/profile_banners/720487892670410753/1501134308/1500x500',
  },
};
