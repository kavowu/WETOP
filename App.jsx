import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Shield, Zap, Wind, CheckCircle, Star, Phone, Mail, MapPin, Clock, TrendingDown, DollarSign, Users, Award } from 'lucide-react'
import './App.css'

// 導入新的背景圖片
import heroBg from './assets/hero_bg_bright.png'
import airFlowPattern from './assets/air_flow_pattern.png'
import cleanAirBubbles from './assets/clean_air_bubbles.png'
import naturePurification from './assets/nature_purification.png'

// 導入原有圖片
import modernOffice from './assets/modern_office.jpg'
import hospitalInterior from './assets/hospital_interior.jpg'
import restaurantKitchen from './assets/restaurant_kitchen.jpg'
import meetingRoom from './assets/meeting_room.jpg'
import airPurifierTech from './assets/air_purifier_tech.jpg'
import shoppingMall from './assets/shopping_mall.jpg' // 用戶提供的百貨商場圖片

function App() {
  const [activeIndustry, setActiveIndustry] = useState('商辦百貨') // 預設選中商辦百貨
  const [isVisible, setIsVisible] = useState(false)
  const [showRiskAssessment, setShowRiskAssessment] = useState(false) // 風險評估模態框狀態
  const [selectedItems, setSelectedItems] = useState([]) // 選中的評估項目

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 風險評估表格數據
  const riskAssessmentItems = [
    { id: 1, description: '過去六個月內有住家裝潢或添置木製傢俱', problem: '甲醛', score: 5, risk: '高' },
    { id: 2, description: '地毯、棉被不常清洗、更換或曝曬消毒', problem: '微生物、異味', score: 5, risk: '高' },
    { id: 3, description: '家人有抽菸習慣', problem: '二、三手菸', score: 5, risk: '高' },
    { id: 4, description: '家中為保護隱私，密閉性極佳，也未使用新風設備', problem: '二氧化碳', score: 5, risk: '高' },
    { id: 5, description: '經常使用各式清潔劑打掃，人員進出也會配合使用消毒劑(酒精、次氯酸水等)', problem: 'TVOCs', score: 5, risk: '高' },
    { id: 6, description: '家中經常開伙', problem: '油煙、異味', score: 4, risk: '高' },
    { id: 7, description: '烹調中未使用抽油煙機，也未使用空氣清淨機', problem: '油煙、異味', score: 4, risk: '高' },
    { id: 8, description: '家中常感覺潮濕，天花板及牆壁已出現壁癌', problem: '黴菌、異味', score: 4, risk: '高' },
    { id: 9, description: '不開窗，長時間使用冷氣或大樓空調', problem: '微生物、異味', score: 3, risk: '中' },
    { id: 10, description: '有持續使用香精、香氛等芳香劑', problem: '微生物、TVOCs', score: 3, risk: '中' },
    { id: 11, description: '家中養寵物', problem: '微生物、異味', score: 3, risk: '中' },
    { id: 12, description: '連續使用空氣清淨機卻未更換濾網或做保養', problem: '微生物、TVOCs', score: 2, risk: '中' },
    { id: 13, description: '室內有固定燒香', problem: '顆粒、異味', score: 2, risk: '中' },
    { id: 14, description: '住家空間人口密集(小坪數但多人同時居住)', problem: '微生物、異味', score: 2, risk: '中' },
    { id: 15, description: '管線或通風問題，經常聞到異味', problem: '微生物、異味', score: 2, risk: '中' },
    { id: 16, description: '室內使用印表機、工具機、暖爐、電爐等設備', problem: '顆粒、二氧化碳', score: 1, risk: '低' },
    { id: 17, description: '使用各種化妝品、定型液及保養品', problem: 'TVOCs', score: 1, risk: '低' },
    { id: 18, description: '未使用除濕機、任何空氣清淨設備', problem: '室內空氣品質', score: 1, risk: '低' }
  ]

  // 處理評估項目選擇
  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  // 計算總分和風險等級
  const calculateRisk = () => {
    const totalScore = selectedItems.reduce((sum, itemId) => {
      const item = riskAssessmentItems.find(item => item.id === itemId)
      return sum + (item ? item.score : 0)
    }, 0)
    
    let riskLevel = '低'
    if (totalScore >= 15) riskLevel = '高'
    else if (totalScore >= 8) riskLevel = '中'
    
    return { totalScore, riskLevel }
  }

  const industries = {
    '飯店民宿': {
      icon: '🏨',
      image: hospitalInterior,
      penalty: '直接虧損+品牌傷害',
      odorScenes: ['房內霉味', '菸味殘留', '藥味異味', '寵物氣味'],
      actualLoss: '每少租一天直接虧損數千元，負評影響10-15個潛在客人',
      urgentNeed: '每少租一天＝直接虧損；怕被負評流失客源',
      wetopAngle: '除味即收益回復；品牌「無味」可被廣告',
      painPoints: [
        '客訴換房導致當晚無法出租',
        'OTA負評持續影響未來訂房',
        '品牌傷害的長期影響難以估量',
        '競爭激烈市場中體驗是關鍵'
      ],
      solutions: [
        '快速恢復房間可租狀態',
        '建立「無異味」品牌形象',
        '提升客戶滿意度和回頭率',
        '可作為行銷差異化賣點'
      ],
      case: '知名連鎖飯店導入WETOP後，客訴率下降80%，OTA評分提升至4.8星，平均房價提升15%。'
    },
    '二手車商': {
      icon: '🚗',
      image: meetingRoom,
      penalty: 'NT$10,000~50,000降價',
      odorScenes: ['菸味滲透', '霉味問題', '寵物異味', '香水殘留'],
      actualLoss: '一車降價1-5萬元，嚴重者完全無法出售',
      urgentNeed: '成交率降低＋翻車速度變慢',
      wetopAngle: 'WETOP除味不損車內設備；每車一個利潤點',
      painPoints: [
        '異味直接影響車輛售價',
        '庫存週轉率影響現金流',
        '潛在買家看車就產生負面印象',
        '處理時間延長增加持有成本'
      ],
      solutions: [
        '不損害車內設備的深度除味',
        '提升車輛銷售價格和速度',
        '處理奈米級菸草殘留物',
        '每台車投資回報率極高'
      ],
      case: '專業車商使用WETOP處理200台車輛，平均每台車價值提升2.5萬元，投資回報率達500%。'
    },
    '建商建案': {
      icon: '🏠',
      image: modernOffice,
      penalty: '流失買主+降價成交',
      odorScenes: ['裝潢膠味', '甲醛超標', '霉味潮氣', '建材異味'],
      actualLoss: '賞屋體驗差直接流失買主，可能需降價成交',
      urgentNeed: '案場氣味會直接影響買氣與銷售期',
      wetopAngle: '唯一能「為空氣定價」的除味方案',
      painPoints: [
        '第一印象決定購屋意願',
        '樣品屋體驗影響銷售成效',
        '銷售期延長增加持有成本',
        '口碑傳播的負面效應'
      ],
      solutions: [
        '快速處理甲醛等有害物質',
        '提升賞屋體驗和成交率',
        '可作為健康住宅賣點',
        '縮短銷售期降低成本'
      ],
      case: '大型建商在5個建案導入WETOP，平均銷售期縮短30%，客戶滿意度提升至95%。'
    },
    '餐飲業': {
      icon: '🍽️',
      image: restaurantKitchen,
      penalty: '最高罰款30萬元',
      odorScenes: ['廚房油煙', '排氣異味', '廁所氣味', '濕霉問題'],
      actualLoss: '被檢舉開罰最高30萬、ESG失分、回客率下降',
      urgentNeed: '客人一聞就走；民眾投訴門檻超低',
      wetopAngle: '可主打ESG除味裝置＋合規降風險',
      painPoints: [
        '空污法規日趨嚴格',
        '鄰居投訴導致稽查罰款',
        '異味影響客戶用餐體驗',
        'ESG評分影響企業形象'
      ],
      solutions: [
        '符合空污法規要求',
        '有效處理油煙和異味',
        '提升ESG環保評分',
        '改善客戶用餐環境'
      ],
      case: '連鎖餐廳導入WETOP後，零投訴記錄維持2年，ESG評分提升至A級，客戶回流率增加40%。'
    },
    '商辦百貨': {
      icon: '🏢',
      image: shoppingMall, // 使用用戶提供的百貨商場圖片
      penalty: '空租+租金折讓',
      odorScenes: ['新裝修味', '回風霉味', '下水道味', '化學異味'],
      actualLoss: '空租、客戶要求租金折讓、開幕延期',
      urgentNeed: '一坪租不出去就是錢；租戶體驗差',
      wetopAngle: '可協助取得IAQ標章，快速去味不干擾裝潢',
      painPoints: [
        '空租直接影響收入',
        '租戶滿意度影響續約率',
        '新裝修異味影響招租',
        '競爭激烈需要差異化優勢'
      ],
      solutions: [
        '快速處理裝修異味',
        '協助取得IAQ認證',
        '提升租戶滿意度',
        '增強招租競爭力'
      ],
      case: '頂級商辦導入WETOP並取得IAQ標章，出租率達100%，租金溢價15%。'
    },
    '醫療長照': {
      icon: '🏥',
      image: hospitalInterior,
      penalty: '評鑑扣分+家屬抱怨',
      odorScenes: ['尿騷異味', '清潔劑味', '濕霉問題', '藥品氣味'],
      actualLoss: '評鑑扣分、住民家屬抱怨、感染風險',
      urgentNeed: '一旦失分或家屬反感→收費與評價都降',
      wetopAngle: 'SNQ防疫＋持續性運作優勢，替代臭氧機',
      painPoints: [
        '評鑑結果影響營運許可',
        '家屬滿意度影響入住率',
        '異味暗示衛生問題',
        '感染控制要求嚴格'
      ],
      solutions: [
        '提升評鑑成績',
        '增加家屬信任度',
        '降低感染風險',
        '持續運作不影響照護'
      ],
      case: '大型醫院導入WETOP後，評鑑成績提升至優等，家屬滿意度達98%，院內感染率下降60%。'
    },
    '教育托嬰': {
      icon: '🏫',
      image: meetingRoom,
      penalty: '招生下降+教職反感',
      odorScenes: ['書本油墨味', '濕霉異味', '消毒水味', '建築老味'],
      actualLoss: '家長抱怨→招生下降、教職員反感',
      urgentNeed: '異味被視為「不安全」的象徵',
      wetopAngle: '無毒無香無殘留，是最安全的教學空氣',
      painPoints: [
        '家長對環境安全要求極高',
        '異味影響招生成效',
        '教職員工作滿意度',
        '兒童健康安全考量'
      ],
      solutions: [
        '提供最安全的學習環境',
        '無毒無害適合兒童',
        '提升家長信任度',
        '改善教職員工作環境'
      ],
      case: '知名幼兒園導入WETOP後，家長滿意度100%，招生名額供不應求，成為區域標竿學校。'
    },
    '展場櫃位': {
      icon: '🛍️',
      image: meetingRoom,
      penalty: '錯失黃金銷售期',
      odorScenes: ['裝潢膠味', '商品異味', '廁所氣味', '臨時建材味'],
      actualLoss: '開幕時來客數減、品牌體驗扣分',
      urgentNeed: '黃金展售期失利→錯失一波營收',
      wetopAngle: '快速啟動除味、可在展前1天處理完成',
      painPoints: [
        '展期時間有限機會珍貴',
        '第一印象影響整體銷售',
        '品牌體驗直接影響購買',
        '無法重來的銷售機會'
      ],
      solutions: [
        '展前快速處理異味',
        '確保最佳開幕體驗',
        '提升品牌形象',
        '最大化銷售機會'
      ],
      case: '國際展覽使用WETOP處理50個展位，參觀滿意度提升35%，現場成交率增加50%。'
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-mint-50">
      {/* Hero Section - 明亮清新的主視覺 */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* 浮動氣泡裝飾 */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${cleanAirBubbles})`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        {/* 空氣流動圖案 */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${airFlowPattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-coral-400 to-orange-400 text-white px-6 py-3 rounded-full shadow-lg mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">緊急警告</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-slate-700">你已經很努力，</span><br />
            <span className="text-amber-500">卻還是輸給了</span><br />
            <span className="text-slate-700">奈米級污染</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="font-bold text-coral-500">異味 = 奈米級污染 = 企業風險</span><br />
            對個人是健康與舒適問題，對企業則是價值損失、品牌危機、合規風險、營收中斷
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={() => setShowRiskAssessment(true)}
              className="bg-gradient-to-r from-coral-500 to-orange-500 hover:from-coral-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              立即評估風險
            </button>
            <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-sky-200">
              查看解決方案
            </button>
          </motion.div>
        </div>

        {/* 浮動動畫 */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </section>

      {/* 企業四大危機 - 明亮卡片設計 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-50 to-mint-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-700"
            {...fadeInUp}
          >
            企業面臨的四大危機
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { 
                title: '價值損失', 
                desc: '異味問題直接影響營收、客戶流失、員工效率降低',
                icon: <DollarSign className="w-8 h-8" />,
                color: 'from-coral-400 to-orange-400'
              },
              { 
                title: '品牌危機', 
                desc: '負面口碑快速傳播、競爭對手趁機搶市',
                icon: <TrendingDown className="w-8 h-8" />,
                color: 'from-amber-400 to-yellow-400'
              },
              { 
                title: '合規風險', 
                desc: '環保法規日趨嚴格、罰款金額持續提高',
                icon: <AlertTriangle className="w-8 h-8" />,
                color: 'from-sky-400 to-blue-400'
              },
              { 
                title: '營收中斷', 
                desc: '強制停業整改、客戶取消訂單、重建成本高昂',
                icon: <Users className="w-8 h-8" />,
                color: 'from-mint-400 to-green-400'
              }
            ].map((crisis, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${crisis.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {crisis.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-700">{crisis.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{crisis.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 八大產業異味矩陣分析 - 全新擴展版 */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-sky-50 to-mint-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-slate-700"
            {...fadeInUp}
          >
            八大產業異味深度分析
          </motion.h2>

          <motion.p 
            className="text-xl text-center text-slate-600 mb-16 max-w-4xl mx-auto"
            {...fadeInUp}
          >
            每個產業都有獨特的異味挑戰和商業損失模式，WETOP提供針對性的解決方案
          </motion.p>

          {/* 產業標籤 - 8個產業 */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            {...fadeInUp}
          >
            {Object.keys(industries).map((industry, index) => {
              const colors = [
                'from-green-500 to-emerald-500', // 飯店民宿
                'from-blue-500 to-indigo-500',   // 二手車商
                'from-orange-500 to-amber-500',  // 建商建案
                'from-purple-500 to-violet-500', // 餐飲業
                'from-cyan-500 to-teal-500',     // 商辦百貨
                'from-pink-500 to-rose-500',     // 醫療長照
                'from-purple-600 to-indigo-600', // 教育托嬰
                'from-orange-600 to-red-500'     // 展場櫃位
              ];
              
              return (
                <button
                  key={industry}
                  onClick={() => setActiveIndustry(industry)}
                  className={`px-4 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm ${
                    activeIndustry === industry
                      ? `bg-gradient-to-r ${colors[index]} text-white shadow-xl`
                      : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-sky-200'
                  }`}
                >
                  <span className="mr-1">{industries[industry].icon}</span>
                  {industry}
                </button>
              );
            })}
          </motion.div>

          <div className="text-center mb-8">
            <span className="bg-gradient-to-r from-coral-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
              損失風險：{industries[activeIndustry].penalty}
            </span>
          </div>

          {/* 產業詳細資訊 - 全新設計 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-3xl">
                  {industries[activeIndustry].icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-700">{activeIndustry}</h3>
                  <p className="text-slate-500">專業異味解決方案</p>
                </div>
              </div>

              {/* 產業圖片 - 商辦百貨使用用戶提供的圖片並放大 */}
              <div className="mb-8 flex justify-center">
                <div className={`rounded-2xl overflow-hidden shadow-lg ${activeIndustry === '商辦百貨' ? 'transform scale-110' : ''}`}>
                  <img 
                    src={industries[activeIndustry].image} 
                    alt={activeIndustry}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>

              {/* 四個關鍵資訊卡片 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-coral-50 to-orange-50 rounded-2xl p-6 border border-coral-200">
                  <h4 className="font-bold text-coral-600 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    常見異味場景
                  </h4>
                  <ul className="space-y-2">
                    {industries[activeIndustry].odorScenes.map((scene, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-2 h-2 bg-coral-400 rounded-full"></div>
                        {scene}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                  <h4 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    實際損失分析
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industries[activeIndustry].actualLoss}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
                  <h4 className="font-bold text-sky-600 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    剛需觸發點
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industries[activeIndustry].urgentNeed}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-mint-50 to-green-50 rounded-2xl p-6 border border-mint-200">
                  <h4 className="font-bold text-mint-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    WETOP切入角度
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {industries[activeIndustry].wetopAngle}
                  </p>
                </div>
              </div>

              {/* 痛點與解決方案對比 */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-coral-500 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    核心痛點分析
                  </h4>
                  <ul className="space-y-3">
                    {industries[activeIndustry].painPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600">
                        <AlertTriangle className="w-5 h-5 text-coral-500 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-mint-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    WETOP解決方案
                  </h4>
                  <ul className="space-y-3">
                    {industries[activeIndustry].solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-mint-500 mt-0.5 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 成功案例 */}
              <div className="bg-gradient-to-r from-sky-50 to-mint-50 rounded-2xl p-6 border border-sky-200">
                <h4 className="text-lg font-bold mb-3 text-slate-700 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  成功案例實證
                </h4>
                <p className="text-slate-600 leading-relaxed">{industries[activeIndustry].case}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* PICT技術介紹 - 自然淨化主題 */}
      <section 
        className="py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${naturePurification})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-sky-50/90 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-700"
            {...fadeInUp}
          >
            WETOP PICT技術：奈米級污染的終極解決方案
          </motion.h2>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 mb-12"
            {...fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-700">PICT技術原理</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Photo-Ion-Catalysis Technology（光、離子、催化技術）模仿太陽光照射地球的自然淨化過程，
              主動分解奈米級污染物和異味分子，實現真正的源頭治理。
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Zap className="w-8 h-8" />, title: '主動分解', desc: '不只過濾，更能分解', color: 'from-amber-400 to-yellow-400' },
                { icon: <Wind className="w-8 h-8" />, title: '奈米級處理', desc: '處理傳統設備無法處理的污染物', color: 'from-sky-400 to-blue-400' },
                { icon: <Shield className="w-8 h-8" />, title: '零死角淨化', desc: '空氣和物體表面同時淨化', color: 'from-mint-400 to-green-400' },
                { icon: <CheckCircle className="w-8 h-8" />, title: '安全無害', desc: '專利濃度控制，不傷人體', color: 'from-coral-400 to-orange-400' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-700 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-3 rounded-full border border-amber-200">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-slate-700">權威認證</span>
              </div>
              <p className="mt-4 text-slate-600">
                已通過台灣經濟部專案測試，並應用於桃園機場和馬偕醫院等頂級機構
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 產品對比 - 明亮對比設計 */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50 via-white to-mint-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-700"
            {...fadeInUp}
          >
            WETOP vs 傳統空氣清淨機
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            {...fadeInUp}
          >
            {/* 傳統空氣清淨機 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-600 text-center">傳統空氣清淨機</h3>
              <ul className="space-y-4">
                {[
                  '只能被動過濾微米級污染物',
                  '對奈米級異味分子束手無策',
                  '僅能掩蓋或稀釋異味',
                  '無法處理物體表面污染',
                  '需要定期更換濾網',
                  '處理範圍有限'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WETOP環境淨化器 */}
            <div className="bg-gradient-to-br from-sky-100 to-mint-100 rounded-3xl p-8 shadow-xl border-2 border-sky-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-coral-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                推薦選擇
              </div>
              <h3 className="text-2xl font-bold mb-6 text-slate-700 text-center">WETOP環境淨化器</h3>
              <ul className="space-y-4">
                {[
                  '主動分解奈米級污染物',
                  '真正去除異味分子',
                  '從源頭解決污染問題',
                  '同時淨化空氣和物體表面',
                  '免更換耗材設計',
                  '零死角全空間淨化'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-mint-500 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA區域 - 明亮呼籲設計 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-400 via-blue-500 to-mint-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            style={{
              backgroundImage: `url(${cleanAirBubbles})`,
              backgroundSize: '300px 300px',
              backgroundRepeat: 'repeat',
              animation: 'float 15s ease-in-out infinite'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
            {...fadeInUp}
          >
            守法是最低道德標準<br />
            企業永續是最高訴求
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8"
            {...fadeInUp}
          >
            WETOP不只是空氣淨化設備，更是企業永續經營的戰略投資
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeInUp}
          >
            <button className="bg-white hover:bg-gray-50 text-sky-600 px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              免費現場評估
            </button>
            <button className="bg-gradient-to-r from-coral-500 to-orange-500 hover:from-coral-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              立即諮詢專家
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer - 明亮簡潔設計 */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-sky-300">WETOP</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                專業的企業空氣品質解決方案提供商，致力於為企業創造健康的工作環境。
              </p>
              <div className="flex gap-4">
                <button className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg font-bold transition-colors">
                  桃園機場認證
                </button>
                <button className="bg-mint-500 hover:bg-mint-600 px-4 py-2 rounded-lg font-bold transition-colors">
                  馬偕醫院採用
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-sky-300">八大產業解決方案</h4>
              <ul className="space-y-2 text-gray-300 grid grid-cols-2 gap-1">
                <li>🏨 飯店民宿</li>
                <li>🚗 二手車商</li>
                <li>🏠 建商建案</li>
                <li>🍽️ 餐飲業</li>
                <li>🏢 商辦百貨</li>
                <li>🏥 醫療長照</li>
                <li>🏫 教育托嬰</li>
                <li>🛍️ 展場櫃位</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-sky-300">聯絡我們</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-400" />
                  <span>諮詢電話：03-6685878</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-400" />
                  <span>專業評估信箱：info@wetop.com.tw</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 mt-0.5" />
                  <div>
                    <div>公司住址：新竹縣竹北市文興路一段360號</div>
                    <div className="text-sm text-gray-400 mt-1">No. 360, Sec. 1, Wenxing Rd., Zhubei City, Hsinchu County 30272, Taiwan(R.O.C.)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 WETOP 環境淨化器. 保留所有權利. | 八大產業奈米級污染防護專家</p>
          </div>
        </div>
      </footer>

      {/* 風險評估模態框 */}
      <AnimatePresence>
        {showRiskAssessment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRiskAssessment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">室內空氣品質風險評估</h2>
                  <button
                    onClick={() => setShowRiskAssessment(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 mt-2">請勾選符合您現況的項目，系統將為您計算風險等級</p>
              </div>

              <div className="overflow-y-auto max-h-[60vh] p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">編號</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">選項</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-bold">可能問題</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-bold">勾選</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-bold">積分</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-bold">風險</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskAssessmentItems.map((item) => (
                        <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                          <td className="border border-gray-300 px-4 py-3 text-center font-medium">{item.id}</td>
                          <td className="border border-gray-300 px-4 py-3">{item.description}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{item.problem}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleItemSelect(item.id)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-bold">{item.score}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                              item.risk === '高' ? 'bg-red-100 text-red-800' :
                              item.risk === '中' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {item.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-lg">
                    <span className="font-bold">總分：{calculateRisk().totalScore}</span>
                    <span className="ml-4 font-bold">風險等級：
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                        calculateRisk().riskLevel === '高' ? 'bg-red-100 text-red-800' :
                        calculateRisk().riskLevel === '中' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {calculateRisk().riskLevel}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedItems([])}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      重置
                    </button>
                    <button
                      onClick={() => setShowRiskAssessment(false)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      完成評估
                    </button>
                  </div>
                </div>
                
                {/* 高風險警告提示 */}
                {calculateRisk().totalScore >= 15 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-bold">高風險警告</span>
                    </div>
                    <p className="text-red-700 mt-2">
                      若自評總分超過15分，可能身處在危險的室內環境，應該立即採取有效措施改善環境
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

