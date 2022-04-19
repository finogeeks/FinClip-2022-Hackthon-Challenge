import fly from './fly.js';
const config = {
  appId: 'string',
  context: {
    channel: 'string',
    entityId: 'gwin',
    locale: 'string',
    orgId: 'string',
    privileges: 'string',
    roles: 'string',
    serviceId: 'string',
    userId: 'string',
  },
};

//接口列表
export class Api {
  //获取全国
  ChinaEpidemicDataInquiry = async data => {
    return fly.post('/ftyq/v1/ChinaEpidemicDataInquiry', { ...data, ...config });
  };
  // 获取全量
  GlobalEpidemicDataMaintenance = async data => {
    return fly.post('/ftyq/v1/GlobalEpidemicDataMaintenance', { ...data, ...config });
  };
  // 资讯列表
  InformationDataListInquiry = async data => {
    return fly.post('/ftyq/v1/InformationDataListInquiry', { ...data, ...config });
  };
  // 资讯详情
  InformationDataDetailInquiry = async data => {
    return fly.post('/ftyq/v1/InformationDataDetailInquiry', { ...data, ...config });
  };
  // 地图数据
  FeatureCollectionInquiry = async data => {
    return fly.post('/ftyq/v1/FeatureCollectionInquiry', { ...data, ...config });
  };
	// 全国风险地区查询
	AllRiskAreaListInquiry = async data => {
	  return fly.post('/ftyq/v1/AllRiskAreaListInquiry', { ...data, ...config });
	};
	// 城市风险地区列表查询
	CountyRiskAreaListInquiry = async data => {
	  return fly.post('/ftyq/v1/CountyRiskAreaListInquiry', { ...data, ...config });
	};
}
export default new Api();
