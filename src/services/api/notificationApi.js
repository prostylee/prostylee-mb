import {_fetch} from '../config';
import {POST, GET} from 'constants';

export const getListNotificationService = (payload) => {
  return {
    data: {
      data: {
        content: [
          {
            status: 0,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            status: 0,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
          {
            status: 1,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
          {
            status: 1,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            status: 0,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
          {
            status: 0,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
          {
            status: 1,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
          {
            status: 1,
            title: 'Thanh Tâm đã bình luận ảnh của bạn',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum eget turpis scelerisque blandit ...',
            date: '07:12 20-12-2020',
            images: [1, 2, 3, 4, 5],
          },
        ],
        empty: true,
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        pageable: [Object],
        size: 12,
        sort: [Object],
        totalElements: 0,
        totalPages: 12,
      },
      error: null,
      status: 200,
    },
    ok: true,
  };
  // return _fetch(GET, '/notifications', {
  //   ...payload,
  // });
};
