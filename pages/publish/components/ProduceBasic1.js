import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import Link from "next/link";

const ProduceBasic1 = () => {
	return (
		<div className="tab-content-in">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">수주정보</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<Flex className="order-info-wrap">
				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="시리얼번호">
								<span>시리얼번호</span>
							</Tooltip>
						</div>

						<p className="txt-order-info serial">
							<Link href={"#"}>57024060242</Link>
						</p>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제조번호">
								<span>제조번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="A2025-000025">
								<span>A2025-000025</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품처">
								<span>납품처</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="아이마켓(SEMES)">
								<span>아이마켓(SEMES)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="고객사">
								<span>고객사</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="아이코어시스템즈코리아">
								<span>아이코어시스템즈코리아</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="출고종류">
								<span>출고종류</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="STOCK(양산)">
								<span>STOCK(양산)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제품군">
								<span>제품군</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="MARU">
								<span>MARU</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="모델">
								<span>모델</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="7000s">
								<span>7000s</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="세부모델">
								<span>세부모델</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="7000">
								<span>7000</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="채널">
								<span>채널</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="MGMR">
								<span>MGMR</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0">
								<span>0</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="MGMR BIN#">
								<span>MGMR BIN#</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="4">
								<span>4</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="MGMR 최대유량">
								<span>MGMR 최대유량</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="5000">
								<span>5000</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="MFC 사양">
								<span>MFC 사양</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="유량범위">
								<span>유량범위</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="5sccm~30SLM">
								<span>5sccm~30SLM</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="장착위치">
								<span>장착위치</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Up Stream">
								<span>Up Stream</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="밸브타입">
								<span>밸브타입</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Solenoid (N.C)">
								<span>Solenoid (N.C)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="하스텔로이">
								<span>하스텔로이</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="X">
								<span>X</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Body 타입">
								<span>Body 타입</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Normal">
								<span>Normal</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Orifice 씰링">
								<span>Orifice 씰링</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Metal">
								<span>Metal</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="피팅종류">
								<span>피팅종류</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="IGS">
								<span>IGS</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="싸이즈/씰">
								<span>싸이즈/씰</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title='1.125"W'>
								<span>1.125&quot;W</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Valve Seat">
								<span>Valve Seat</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Metal">
								<span>Metal</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="후단 사용조건">
								<span>후단 사용조건</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="VACUUM">
								<span>VACUUM</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Liquid & Precursor">
								<span>Liquid & Precursor</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="CPZr">
								<span>CPZr</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="Cal Liquid">
								<span>Cal Liquid</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="IPA">
								<span>IPA</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="비고">
								<span>비고</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="특주번호">
								<span>특주번호</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="S01">
								<span>S01</span>
							</Tooltip>
						</div>
					</Flex>
				</div>

				<div>
					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제품 Rev">
								<span>제품 Rev</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2">
								<span>2</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="압력범위 (최저)">
								<span>압력범위 (최저)</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="35">
								<span>35</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="압력범위 (중심)">
								<span>압력범위 (중심)</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="35">
								<span>35</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="압력범위 (최대)">
								<span>압력범위 (최대)</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="60">
								<span>60</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="사용 압력단위">
								<span>사용 압력단위</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="PSI">
								<span>PSI</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="제어 압력단위">
								<span>제어 압력단위</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="사용가스">
								<span>사용가스</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="F2(20%)N2">
								<span>F2(20%)N2</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="교정가스">
								<span>교정가스</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="N2">
								<span>N2</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="유량">
								<span>유량</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="50000">
								<span>50000</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="C.F">
								<span>C.F</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="0.983">
								<span>0.983</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="환산유량">
								<span>환산유량</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="50864.7">
								<span>50864.7</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="유량단위">
								<span>유량단위</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="SCCM">
								<span>SCCM</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="전원 포트형상">
								<span>전원 포트형상</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Dsub MKP [9] PIN">
								<span>Dsub MKP [9] PIN</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="포트위치">
								<span>포트위치</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="Side">
								<span>Side</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="통신방식">
								<span>통신방식</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="E-CAT">
								<span>E-CAT</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="통신코드">
								<span>통신코드</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="EtherCAT">
								<span>EtherCAT</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="IO Size">
								<span>IO Size</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="MAX DATA">
								<span>MAX DATA</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="-">
								<span>-</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품계획일">
								<span>납품계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22 00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="생산계획일">
								<span>생산계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22 00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="검사계획일">
								<span>검사계획일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22 00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="생산부서">
								<span>생산부서</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="제조2팀 (2)">
								<span>제조2팀 (2)</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="등록자">
								<span>등록자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="홍길동">
								<span>홍길동</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="등록일">
								<span>등록일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22 00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품자">
								<span>납품자</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="이몽룡">
								<span>이몽룡</span>
							</Tooltip>
						</div>
					</Flex>

					<Flex align="center" className="order-info-area">
						<div className="title-order-info">
							<Tooltip title="납품일">
								<span>납품일</span>
							</Tooltip>
						</div>

						<div className="txt-order-info">
							<Tooltip title="2025-08-22 00:00">
								<span>2025-08-22 00:00</span>
							</Tooltip>
						</div>
					</Flex>
				</div>
			</Flex>
		</div>
	);
};

export default ProduceBasic1;
