import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'PROD-1001',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 799,
    description:
      'A sleek, ergonomic wireless mouse with 2.4GHz connectivity, silent clicks, and a precision optical sensor. Perfect for everyday productivity and comfortable all-day use.',
    image:
      'https://images.pexels.com/photos/7151696/pexels-photo-7151696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    stock: 42,
  },
  {
    id: 'PROD-1002',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 3499,
    description:
      'A full-sized mechanical keyboard with hot-swappable switches, tactile feedback, and a durable aluminum frame. Enjoy a premium typing experience with every keystroke.',
    image:
      'https://images.pexels.com/photos/9020272/pexels-photo-9020272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    stock: 25,
  },
  {
    id: 'PROD-1003',
    name: 'USB-C Hub',
    category: 'Accessories',
    price: 1899,
    description:
      'A compact 7-in-1 USB-C hub with HDMI 4K output, USB 3.0 ports, SD card reader, and 100W PD passthrough charging. Expand your laptop connectivity instantly.',
    image:
      'https://images.pexels.com/photos/4195404/pexels-photo-4195404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.3,
    stock: 60,
  },
  {
    id: 'PROD-1004',
    name: 'Laptop Stand',
    category: 'Home Office',
    price: 1299,
    description:
      'An adjustable aluminum laptop stand that elevates your screen to eye level, improving posture and airflow. Foldable and portable for use anywhere.',
    image:
      'https://images.pexels.com/photos/4792712/pexels-photo-4792712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    stock: 38,
  },
  {
    id: 'PROD-1005',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2499,
    description:
      'Over-ear wireless headphones with active noise cancellation, 30-hour battery life, and plush memory-foam ear cushions for immersive, all-day listening.',
    image:
      'https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    stock: 30,
  },
  {
    id: 'PROD-1006',
    name: 'Gaming Mouse',
    category: 'Gaming',
    price: 1599,
    description:
      'A high-precision gaming mouse with a 16,000 DPI sensor, customizable RGB lighting, and 8 programmable buttons. Built for competitive performance.',
    image:
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    stock: 50,
  },
  {
    id: 'PROD-1007',
    name: 'Mechanical Gaming Keyboard',
    category: 'Gaming',
    price: 4299,
    description:
      'A tenkeyless mechanical gaming keyboard with blue switches, dynamic RGB backlighting, and anti-ghosting. Engineered for fast, accurate gameplay.',
    image:
      'https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    stock: 18,
  },
  {
    id: 'PROD-1008',
    name: 'HD Webcam',
    category: 'Electronics',
    price: 2199,
    description:
      'A 1080p HD webcam with auto-focus, dual stereo microphones, and low-light correction. Deliver crisp, professional video for calls and streaming.',
    image:
      'https://images.pexels.com/photos/40094748/pexels-photo-40094748.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.2,
    stock: 27,
  },
  {
    id: 'PROD-1009',
    name: 'LED Desk Lamp',
    category: 'Home Office',
    price: 999,
    description:
      'A modern LED desk lamp with adjustable brightness, three color temperatures, and a sleek minimalist design. Eye-friendly lighting for work or study.',
    image:
      'https://images.pexels.com/photos/7439756/pexels-photo-7439756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.3,
    stock: 45,
  },
  {
    id: 'PROD-1010',
    name: 'Portable SSD 1TB',
    category: 'Electronics',
    price: 5999,
    description:
      'A 1TB portable SSD with USB 3.2 Gen 2 speeds up to 1050 MB/s, compact design, and shock resistance. Carry your data fast and securely.',
    image:
      'https://images.pexels.com/photos/5335964/pexels-photo-5335964.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    stock: 22,
  },
  {
    id: 'PROD-1011',
    name: 'Bluetooth Speaker',
    category: 'Accessories',
    price: 1799,
    description:
      'A portable Bluetooth 5.0 speaker with 360-degree sound, 12-hour playtime, and IPX7 waterproofing. Rich audio wherever you go.',
    image:
      'https://images.pexels.com/photos/13465232/pexels-photo-13465232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.4,
    stock: 33,
  },
  {
    id: 'PROD-1012',
    name: 'Phone Stand',
    category: 'Accessories',
    price: 499,
    description:
      'A sturdy, adjustable phone stand with a weighted base and anti-slip silicone pads. Holds your phone at the perfect viewing angle hands-free.',
    image:
      'https://images.pexels.com/photos/16003939/pexels-photo-16003939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.1,
    stock: 70,
  },
];

export const categories = [
  'All',
  'Electronics',
  'Accessories',
  'Gaming',
  'Home Office',
];
