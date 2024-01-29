import React, { SetStateAction, useEffect, useState } from "react";
import "./SinginDetailWatch.less";
import { Divider, Space, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axiosEL from "../../../../utils/request";
import getAge from "../../../../utils/age";
import CustomModal from "../../../../components/ModalMessage/ModalMessage";
import GlobalMessage from "../../../../utils/GlobalMessage";
//api
import { upDataStatusOfSingin } from "../../../../Service/api/Services/Singin";

/**@type */
import type { ResidentInformationType } from "./interface/SinginDetailWatch";
export default function SinginDetailWatch() {
  const navigate = useNavigate();
  const obj = useLocation(); //接收路由参数
  const id = obj.state.id; //查询详情需要的id
  const kind = obj.state.kind; //类型 (签约 sig / 服务 ser)

  // 头部标题
  const [title, setTitle] = useState("签约详情");
  // 居民详情
  const [userDetail, setUserDetail] = useState<ResidentInformationType>(
    {} as ResidentInformationType
  );

  // 弹窗或者提示  的对象
  const [ModalObj, setModalObj] = useState({
    isflag: false,
    title: "",
    content: "",
  });
  // 1提醒支付
  const tipFun = () => {
    GlobalMessage.success("提醒成功");
  };
  // 关闭
  const onClose = async (falg: boolean) => {
    setModalObj({ ...ModalObj, isflag: false });
    if (falg) {
      console.log("炸了");
      await upDataStatusOfSingin(id, "2"); //驳回
      window.location.reload();
    }
  };

  // 2驳回请求
  // 驳回请求的自定义插槽内容
  const [custmerSolt, setCustmerSolt] = useState();
  const returnOrder = () => {
    setModalObj({ ...ModalObj, isflag: true, title: "驳回确认" });
    setCustmerSolt(
      (
        <div>
          <span>
            驳回原因<span style={{ color: "red" }}>*</span>
          </span>
          <textarea placeholder="请输入驳回原因" cols={50} rows={10}></textarea>
        </div>
      ) as unknown as SetStateAction<undefined>
    );
  };

  // 3编辑信息
  const eidtInfoFun = () => {
    navigate("/manage/singinmange/singinedit?id=" + id); //跳转到编辑
  };

  // 头部标题
  const getRouterData = () => {
    // console.log(id, kind, '要查看详情的id');
    if (kind == "sig") {
      setTitle("签约详情");
    } else if (kind == "ser") {
      setTitle("服务详情");
    }
  };

  // 获取 签约居民详情
  const getUserData = async () => {
    // console.log(title,id,'标题 和 参数 id');
    const url =
      kind == "sig" ? "/api/getSignById" : "/api/getServiceDetailById";
    const res: {
      data: ResidentInformationType;
      msg: string;
      code: number;
    } = await axiosEL.post(url, { id: id });
    console.log(res, "居民详情");
    if (res.code == 200) {
      setUserDetail(res.data);
    }
  };

  useEffect(() => {
    getRouterData(); //获取路由传参
    getUserData(); //获取 签约居民详情
  }, []);

  const reviewFun = async () => {
    await upDataStatusOfSingin(id, "1");
    window.location.reload();
  };
  return (
    <div className="detail">
      <CustomModal
        visible={ModalObj.isflag}
        title={ModalObj.title}
        content={ModalObj.content}
        onClose={onClose}
      >
        {custmerSolt}
      </CustomModal>
      {/*kind == 'sig */}
      {Object.keys(userDetail).length > 0 && (
        <>
          {/* {userDetail.doctorId} */}
          {/* 头部 */}

          <div className="top">
            <span></span>
            {title}
          </div>
          <div className="tbox">
            <p>居民信息</p>
            <div className="oneRow">
              <div>
                <span className="title">姓名</span>
                <span style={{ color: "blue" }}>
                  {userDetail?.resident.name}
                </span>
              </div>
              <div>
                <span className="title">身份证号</span>
                <span>{userDetail?.resident.IDCard}</span>
              </div>
              <div>
                <span className="title">性别</span>
                <span>{userDetail?.resident.gender == "1" ? "女" : "男"}</span>
              </div>
              <div>
                <span className="title">年龄</span>
                <span>{getAge(userDetail?.resident.birthday)}</span>
              </div>
            </div>
            <div className="oneRow oneRow1">
              <div>
                <span className="title">联系电话</span>
                <span>{userDetail?.resident.tel}</span>
              </div>
              <div>
                <span className="title">现居地</span>
                <span>{userDetail?.resident.address}</span>
              </div>
              <div style={{ marginLeft: 100 }}>
                <span className="title">居民标签</span>
                {userDetail?.labelArr.length > 0 &&
                  userDetail?.labelArr.map((e: any, i: number) => {
                    return (
                      <Tag color="magenta" key={i}>
                        {e.name}
                      </Tag>
                    );
                  })}
              </div>
            </div>
            <div className="family">
              <span className="title">家庭成员</span>
              <div className="one">
                <img
                  src="https://cdn7.axureshop.com/demo/1881228/images/%E5%BE%85%E5%AE%A1%E6%A0%B8%E7%AD%BE%E7%BA%A6%E8%AF%A6%E6%83%85/u1575.jpg"
                  alt=""
                />
                <div className="oneright">
                  <div className="rtop">
                    <span>李青</span>
                    <span className="age">45岁</span>
                    <img
                      src="https://cdn7.axureshop.com/demo/1881228/images/%E5%BE%85%E5%AE%A1%E6%A0%B8%E7%AD%BE%E7%BA%A6%E8%AF%A6%E6%83%85/u1576.png"
                      alt=""
                    />
                  </div>
                  <p>关系:&nbsp;父母</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bbox">
            <p>签约信息</p>
            <div className="oneRow">
              <div>
                <span className="title">签约编号</span>
                <span>{userDetail?.number}</span>
              </div>
              <div>
                <span className="title">签约状态</span>
                {userDetail?.status == 0 && (
                  <span style={{ color: "#42d5ae" }}>待审核</span>
                )}
                {userDetail?.status == 1 && (
                  <span style={{ color: "rgb(247, 191, 87)" }}>待支付</span>
                )}
                {userDetail?.status == 2 && (
                  <span style={{ color: "red" }}>已驳回</span>
                )}
                {userDetail?.status == 3 && (
                  <span style={{ color: "blue" }}>生效中</span>
                )}
                {userDetail?.status == 4 && (
                  <span style={{ color: "red" }}>已过期</span>
                )}
              </div>
              <div>
                <span className="title">签约机构</span>
                <span>{userDetail?.organ.name}</span>
              </div>
              <div>
                <span className="title">签约团队</span>
                <span>{userDetail?.team.name}</span>
              </div>
            </div>
            <div className="oneRow">
              <div>
                <span className="title">签约医生</span>
                <span>{userDetail?.doctor.name}</span>
              </div>
              <div>
                <span className="title">服务包</span>
                <span>{userDetail?.service.name}</span>
              </div>
              <div>
                <span className="title">签约周期</span>
                <span>{userDetail?.service.period}年</span>
              </div>
              <div>
                <span className="title">费用</span>
                <span>￥{userDetail?.service.price}</span>
              </div>
            </div>
            <div className="oneRow">
              <div>
                <span className="title">签约类型</span>
                <span>{userDetail?.type}</span>
              </div>
              <div>
                <span className="title">申请时间</span>
                <span>{userDetail?.subscribeTime.replaceAll("-", "/")}</span>
              </div>
              <div>
                <span className="title">生效时间</span>
                <span>{userDetail?.takingEffectTime.replaceAll("-", "/")}</span>
              </div>

              {(userDetail?.status == 2 || userDetail?.status == 1) && (
                <div>
                  <span className="title">审核人</span>
                  <span>{userDetail?.doctor.name}</span>
                </div>
              )}
            </div>
            <div className="oneRow">
              {(userDetail?.status == 2 || userDetail?.status == 1) && (
                <div>
                  <span className="title">审核时间</span>
                  <span>
                    {userDetail?.takingEffectTime.replaceAll("-", "/")}
                  </span>
                </div>
              )}

              {userDetail?.status == 2 && (
                <div>
                  <span className="title">驳回原因</span>
                  <span>该服务包已停止,请重新选择服务包再提交</span>
                </div>
              )}
              <div>
                <span className="title">签约备注</span>
                <span>{userDetail?.notes}</span>
              </div>
            </div>
          </div>

          <div className="foot">
            {/* 驳回 */}
            {userDetail?.status == 2 && (
              <button
                className="back"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                返回
              </button>
            )}
            {userDetail?.status == 0 && (
              <>
                <button className="edit" style={{ cursor: "pointer" }}>
                  编辑签约信息
                </button>
                <button
                  className="pass"
                  style={{ cursor: "pointer" }}
                  onClick={reviewFun}
                >
                  审核通过
                </button>
                <button
                  onClick={returnOrder}
                  style={{ cursor: "pointer" }}
                  className="noPass"
                >
                  驳回
                </button>
              </>
            )}

            {userDetail?.status == 1 && (
              <>
                <button
                  className="edit"
                  style={{ cursor: "pointer" }}
                  onClick={eidtInfoFun}
                >
                  编辑签约信息
                </button>
                <button
                  onClick={tipFun}
                  style={{ cursor: "pointer" }}
                  className="pass"
                >
                  提醒支付
                </button>
                <button
                  className="back"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                >
                  返回
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
