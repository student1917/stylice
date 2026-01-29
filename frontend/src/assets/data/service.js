import re01 from '../../assets/images/recom-1.png'
import re02 from '../../assets/images/recom-2.png'
import re03 from '../../assets/images/recom-3.png'
import re04 from '../../assets/images/recom-4.png'

import gallery01 from '../../assets/images/gallery-1.png'
import gallery02 from '../../assets/images/gallery-2.png'
import gallery03 from '../../assets/images/gallery-3.png'
import gallery04 from '../../assets/images/gallery-4.png'
import gallery05 from '../../assets/images/gallery-5.png'

const service = [
  {
    id: "salon-001",
    name: "Salon Name",
    rating: 4.5,
    reviewsCount: 104,
    address: "Brookpark Ext, 27085, North Olmsted, 44070",
    image: re01,
    price: "$250",
    gallery: [gallery01, gallery02, gallery03, gallery04, gallery05],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-002",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-003",
    name: "Chic Cuts",
    rating: 4.2,
    reviewsCount: 75,
    address: "Oak Street, 98765, Parma, 44129",
    image: re03,
    price: "$20",
    gallery: [gallery02, gallery03, gallery05, gallery01, gallery04],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-004",
    name: "Glow & Go",
    rating: 4.7,
    reviewsCount: 160,
    address: "Sunset Blvd, 45678, Lakewood, 44107",
    image: re04,
    price: "$28",
    gallery: [gallery05, gallery04, gallery03, gallery02, gallery01],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-005",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-006",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-007",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-008",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  },
  {
    id: "salon-009",
    name: "Beauty Haven",
    rating: 4.8,
    reviewsCount: 210,
    address: "Maplewood Dr, 12345, Cleveland, 44101",
    image: re02,
    price: "$30",
    gallery: [gallery03, gallery04, gallery05, gallery01, gallery02],
    description:
      "With a busy life and work pressure, office workers often face problems such as back pain, neck and shoulder pain and mental stress. An Mien Spa understands your need for relaxation and health care, so we offer 'Relaxing Hair Wash Combo Combined with 50 Minutes Facial Care'. This service not only helps you relax but also brings freshness to your skin and hair.",
    termsOfUse: [
      "Only applicable to 1 customer/ 1 phone number/ 1 service.",
      "Not applicable in conjunction with other promotions.",
      "Not redeemable for cash."
    ],
    benefits: [
      "✨ Hair and scalp care: Shampooing with natural herbs helps stimulate blood circulation, improving the health of hair and scalp.",
      "✨ Facial beauty and relaxation: Basic facial care routine helps keep the skin clean, smooth and youthful.",
      "✨ Reduce stress and pain: Head, neck and shoulder massage therapy helps reduce pain, reduce stress, and bring a feeling of comfort and lightness."
    ]
  }
];

export default service;
