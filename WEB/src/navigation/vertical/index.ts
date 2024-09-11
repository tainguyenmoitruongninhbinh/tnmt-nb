// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { PeopleAltOutlined, Tv } from '@mui/icons-material'

const navigation = (router: any): VerticalNavItemsType => {
  //quan tri
  if (router.pathname.includes('quan-tri')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Quản lý',
        primaryPath: 'quan-tri',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            primaryPath: 'nguoi-dung',
            path: '/quan-tri/he-thong/nguoi-dung'
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            primaryPath: 'nhom-nguoi-dung',
            path: '/quan-tri/he-thong/nhom-nguoi-dung'
          },
          {
            title: 'Trang truy cập',
            icon: Tv,
            primaryPath: 'trang-truy-cap',
            path: '/quan-tri/he-thong/trang-truy-cap'
          }
        ]
      },
      {
        title: 'Phân quyền',
        primaryPath: 'quan-tri',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            primaryPath: 'nguoi-dung',
            path: '/quan-tri/phan-quyen/nguoi-dung'
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            primaryPath: 'nhom-nguoi-dung',
            path: '/quan-tri/phan-quyen/nhom-nguoi-dung'
          }
        ]
      }
    ]
  }

  if (router.pathname.includes('')) {
    return [
     
      {
        title: 'Hệ thống cơ sở dữ liệu',
        children: [
          {
            title: 'Lưu vực sông',
            path: '#'
          },
          {
            title: 'Công trình phòng chống lũ',
            path: '#'
          },
          {
            title: 'Phòng chống thiên tai và tìm kiếm cứu nạn',
            path: '#'
          },
          {
            title: 'Trọng điểm phòng chống lũ',
            path: '#'
          },
        ]
      },
      {
        title: 'Bản đồ',
        primaryPath: 'ban-do',
        children: [
          {
            title: 'Thủy lợi',
            path: '#'
          },
          {
            title: 'Đê điều',
            path: '#'
          },
          {
            sectionTitle: 'Bản đồ rủi ro thiên tai'
          },
          {
            title: 'Bão,ATNĐ',
            path: '/ban-do/ban-do-rui-ro/bao-lu'
          },
          {
            title: 'Lốc,sét,mưa đá',
            path: '#'
          },
          {
            title: 'Mưa lớn',
            path: '#'
          },
          {
            title: 'Nắng nóng',
            path: '#'
          },
          {
            title: 'Hạn hán',
            path: '#'
          },
          {
            title: 'Rét đậm, rét hại',
            path: '#'
          },
          {
            title: 'Lũ,ngập,lụt',
            path: '#'
          },
          {
            title: 'Sạt lở đất,sụt lún đất',
            path: '#'
          },
          {
            title: 'Xâm nhập mặn',
            path: '#'
          },
          {
            title: 'Cháy rừng do tự nhiên',
            path: '#'
          },
        ]
      },
      {
        title: 'Điều hành phòng chống thiên tai',
        primaryPath: 'tai-nguyen-nuoc',

        children: [
         
          {
            title: 'Bão, ATNĐ',
            path: '#'
          },
          {
            title: 'Lốc,sét,mưa đá',
            path: '#'
          },
          {
            title: 'Mưa lớn',
            path: '#'
          },

          {
            title: 'Nắng nóng',
            path: '#'
          },
          {
            title: 'Hạn hán',
            path: '#'
          },
          {
            title: 'Rét đậm,rét hại',
            path: '#'
          },
          {
            title: 'KTSD nước mặt',
            path: '#'
          },
        ]
      },

    ]
  }

  //tra ve null, ko coppy cai nay
  return []
}

export default navigation
