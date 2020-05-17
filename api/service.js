import ax from './axios'

// 获取用户信息
export async function getAuth () {
  const res = await ax.get('/auth');
  return res.data;
}

