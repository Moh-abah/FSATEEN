

##############tegalsaifdifrent








#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import socket
import os
import logging


logging.getLogger('websockets').setLevel(logging.CRITICAL)
logging.getLogger('binance').setLevel(logging.ERROR)
# 2. إيقاف وضع التصحيح العنيف (الذي يسبب بطء وقطع الاتصال)
os.environ['PYTHONASYNCIODEBUG'] = '0'

orig_getaddrinfo = socket.getaddrinfo
def patched_getaddrinfo(*args, **kwargs):
    responses = orig_getaddrinfo(*args, **kwargs)
    return [res for res in responses if res[0] == socket.AF_INET]
socket.getaddrinfo = patched_getaddrinfo



from collections import defaultdict, deque
import http.server
import socketserver
import json
import threading
import datetime
import time
import numpy as np
from sklearn.cluster import KMeans

import warnings
warnings.filterwarnings("ignore")
import asyncio
import websockets
import os, time, threading, requests, math
from binance.client import Client
from binance import ThreadedWebsocketManager
from binance.exceptions import BinanceAPIException
import os, sys
from queue import Queue
import logging
from decimal import Decimal, ROUND_DOWN
from threading import Event
import nest_asyncio
from threading import Lock

nest_asyncio.apply()
BINANCE = "https://api.binance.com"

MODE = "PLUS"
# ====================== LIVE ======================
LIVE = True # False = محاكاة ، True = تداول حقيقي
# ====================== HYBRID TRAILING SYSTEM ======================
USE_HYBRID_TRAILING = False          # تفعيل النظام الهجين
ACTIVATION_PROFIT_PCT = 0.0030     # 0.30% (TP1) - لا تنشيط تحت هذه النسبة
TRAILING_DISTANCE_PCT = 0.0010     # 0.03% مسافة التريلينج
MIN_TRAILING_PROFIT_PCT = 0.0030    # أقل ربح مسموح للتريلينج (0.30%)
MAX_TRAILING_ORDER_AGE = 3600       # أقصى عمر لأمر التريلينج (ساعة)


# ====================== 🚀 2160 FUTURE TECH: NIC SETTINGS ======================
VORTEX_SENSITIVITY = 1.50      # معامل حساسية "الدوامة"
INERTIA_THRESHOLD  = 0.030     # عتبة انهيار العطالة (كلما قلّ زادت السرعة)
TIME_COMPRESSION   = 0.85     # معامل ضغط الزمن (لإغلاق الصفقة في ثوانٍ)

# ====================== 🚀 2160 FUTURE TECH: DYNAMIC RANGE ======================
# نطاق الحساسية (حصر قوة الانفجار)
VORTEX_MIN = 1.5      # الحد الأدنى: أي شيء أقل هو "تذبذب ممل"
#VORTEX_MAX = 3.30     # الحد الأقصى: أي شيء أعلى هو "خطر/تلاعب" (Pump & Dump)
VORTEX_MAX = 3.50     # الحد الأقصى: أي شيء أعلى هو "خطر/تلاعب" (Pump & Dump)
# نطاق العطالة (حصر ضغط الأوردر بوك)


INERTIA_MIN = 0.03     # الحد الأدنى: لضمان وجود "شرارة" شراء
#INERTIA_MAX = 0.060     # الحد الأقصى: لضمان أننا لم نصل لـ "نهاية الموجة"
INERTIA_MAX = 0.120

# ===============================================================================




# ====================== RVOL SETTINGS (الجديد) ======================
RVOL_MIN = 2.50           # الحد الأدنى للـ RVOL (أقل من هذا = سيولة ضعيفة)
RVOL_MAX = 8.00           # الحد الأقصى للـ RVOL (أعلى من هذا = تلاعب/خطر)
RVOL_PERIOD = 1          # فترة حساب المتوسط بالدقائق (5 دقائق مناسب للسكالبينج)
RVOL_WEIGHT = 0.3        # وزن RVOL في المعادلة (30%)
IOBI_WEIGHT = 0.5        # وزن IOBI في المعادلة (50%)
SPREAD_WEIGHT = 0.2      # وزن السبريد في المعادلة (20%)
S_THRESHOLD_MIN = 0.15   # الحد الأدنى لـ S Score للدخول
S_THRESHOLD_MAX = 0.80   # الحد الأقصى لـ S Score (لمنع الدخول في تلاعب)
RVOL_CACHE_TTL = 30      # تحديث كاش RVOL كل 30 ثانية
# ===============================================================================


# ====================== ENTRY (ONLY) ======================
ENTRY_TH    = -1.100  # عتبة D_avg
IOBI_TH     = -1.600  # عتبة IOBI_avg
D_WINDOW    = 2      # نافذة D (تيكات)
IOBI_WINDOW = 2      # نافذة IOBI (تيكات)
D_MIN       = -1.100
D_MAX       =  1.00
IOBI_MIN    = -1.600
IOBI_MAX    = 1.00


SIGNAL_D_BOOST = 3.5
SIGNAL_IOBI_BOOST = 4.2


MIN_DAY_RANGE_PCT = 0.005
TP_PREAKOUT_EPS = 0.00006
# ================== SMART ANTI-COLLAPSE THRESHOLDS (UNIVERSAL) ==================
ANTI_MOM_MAX        = 0.03     # 0.30%  | حد آمن عالمي يمنع الانزلاق

ANTI_IOBI_DROP      = 0.015      # 2%     | تحسن حقيقي في الطلب

ANTI_D_CONT_FACTOR  = 0.970      # 5%     | سماح تذبذب صحي بدون كسر القوة

# ================== BLEEDING COINS PROTECTION (UNIVERSAL) ==================

MIN_IMPROVEMENT_TICKS = 1      # عدد التيكات التي يجب أن يستمر فيها التحسن
MIN_IOBI_SLOPE        = 0.000025  # أقل ميل تحسن في IOBI
MIN_D_SLOPE           = 0.000012  # أقل ميل تحسن في D







# ====================== REGIME FILTER (درس الوكلاء) ======================
USE_REGIME_FILTER      = True                    
REGIME_WINDOW          = 20                      # نافذة 20 تكة كافية لالتقاط النظام
REGIME_MAX_SLOPE       = 0.015                 # ميل 0.015% لكل تكة – يسمح بالتذبذب البطيء ويمنع الاتجاهات الواضحة
REGIME_MIN_ATR_RATIO   = 0.0003                  # أدنى تقلب 0.08% – يستبعد العملات الميتة (naihuangbao: أدنى 20%)
REGIME_MAX_ATR_RATIO   = 0.90                   # أقصى تقلب 2.5% – يرفض العواصف ويقبل النشاط الطبيعي (naihuangbao: أعلى 80%)
# ====================== VOLATILITY-ADJUSTED SIZING (الوكلاء) ======================
USE_VOLATILITY_SIZING  = True                    
TARGET_VOLATILITY_EXPOSURE = 0.01                # 1% مخاطرة لكل صفقة (معيار jontheagent و Lona)
ATR_MULTIPLIER_FOR_SIZE = 2.0                    # مضاعف ATR – وقف افتراضي عند 2*ATR
# ====================== SLIPPAGE BUFFER (ibitlabs_reporter) ======================
SLIPPAGE_BUFFER_PCT = 0.0004                     # 0.04% احتياطي انزلاق






# ====================== Risk/Trade ======================
SPEND    = 11.0
MAX_OPEN = 1
COOLDOWN = 2

# ====================== PATIENCE COOLDOWN (درس 90/10 من الوكلاء) ======================
ENFORCE_MIN_COOLDOWN = True           # فرض تهدئة بين الصفقات
MIN_COOLDOWN_SECONDS = 300            # 5 دقائق حد أدنى بين إغلاق صفقة وفتح التالية





# ====================== SMART COOLDOWN SETTINGS ======================
NORMAL_COOLDOWN = 390    # 5 دقائق للحالات العادية (لضمان تصحيح منطقي)
HYPER_COOLDOWN  = 300      # 5 ثوانٍ فقط عند الانفجار (عتبتك التي طلبتها)
HYPER_IOBI_MULT = 2.5    # كم ضعف يجب أن يكون IOBI لكسر التبريد
HYPER_D_MULT    = 2.0    # كم ضعف يجب أن يكون العمق لكسر التبريد



# ====================== PULSE ======================
PULSE_WINDOW     = 2
PULSE_MAX        = 900   # (للعرض فقط)
MIN_PULSE_ENTER  = 0.000003   # 🔥 تذبذب لحظي أدنى للدخول
PULSE_REJECT_PCT = 900  # 🔥 تذبذب أعلى ممنوع
# ================= INSTANT TREND FILTER =================
TREND_WINDOW      = 2        # نافذة الاتجاه اللحظي (تيكات)
MIN_TREND_SLOPE   = -1.000000  # أقل ميل صاعد مسموح (0.015%)
# ====================== Symbols ======================
TOP_MAX   = 33	   	     # ما يظهر
TOP_BACK  = 33  	     # الخلفية تعمل على TOP_BACK
DISPLAY_SYMS = []
# ====================== TP/SL ======================
TP_LEVELS   = 100
TP_BASE_PCT = 0.0063
#TP_BASE_PCT = 0.0080
TP_STEP_PCT = 0.0002
TP_PCTS = [TP_BASE_PCT + (i * TP_STEP_PCT) for i in range(TP_LEVELS)]
SL_PCT = 0.0000
MOM_TICKS = 2
# ====================== ESL ======================
ESL_TIME    = 120000000      # 8 دقائق (480 ثانية)
ESL_PCT     = 0.0030   # لازم تكون رابح >= 0.26%
ESL_IOBI_TH = -0.05    # إذا الدفتر قلب ضدك

SYM_REFRESH_SEC  = 7
TOP_N_VOL        = 15
TOPN_REFRESH_SEC = 5
# ====================== TRUE DEPTH SETTINGS ======================
DEPTH_LIMIT       = 2
DEPTH_REFRESH_SEC = 0.05
DEPTH_WEIGHT_MODE = "value"
DEPTH_DECAY       = 0.57

# ====================== SMART TOP_MAX ======================

SPREAD_MAX               = 0.0008
SPREAD_MAX_FOR_ENTRY     = 0.0008
SPREAD_MIN_FOR_ENTRY     = 0.0001
SPREAD_MIN               = 0.0001
TOPBOOK_MIN_USDT         = 150.0
QV_MIN_USDT              = 30_000_000
COUNT_MIN_24H            = 1_000
MIN_AVG_TRADE_USDT = 1
RECENT_RANGE_TICKS   = 15     # عدد التيكات الأخيرة
MIN_RECENT_RANGE_PCT = 0.0018   # 0.6% توسع سعري حقيقي

SMART_SCORE_ALPHA        = 1.00
SMART_SCORE_BETA         = 0.75
SMART_SCORE_GAMMA        = 0.55
SMART_SCORE_PENALTY      = 1.25
SMART_REFRESH_BACKOFF_SEC = 3

# ====================== GOLDEN FIST & IRON RESISTANCE ======================

# ====================== MARKET REGIME & CANDLE CONFIRMATION ======================
RANGE_TICKS = 2           # نافذة أصغر للاستجابة السريعة
POS_BOTTOM_MAX = 0.25     # السعر ارتفع 28% من القاع ← اتجاه صاعد واضح
POS_TOP_MIN = 0.20        # مسافة 28% من القمة ← مجال للصعود
MIN_RANGE_PCT = 0.0025    # نطاق 0.35% كحد أدنى

CANDLE_CONFIRM_N = 2      # تأكيد أسرع (2 شموع)

# تفعيل Golden Fist للدخول عند اختراق المقاومة
ENABLE_GOLDEN_FIST = False
GF_MIN_CONFIDENCE = 0.75  # ثقة عالية في الاختراق

# إبقاء Iron Resistance للدعم
ENABLE_IRON_RESISTANCE = False
IR_MIN_STRENGTH = 0.15
IR_BREAKOUT_PCT = 0.0020   # اختراق 0.18%
IR_MIN_DISTANCE_PCT = 0.0018


RVOL_CACHE = {}  # {sym: {'avg_volume': float, 'timestamp': float}}


# ====================== GUARANTEED LIVE CLOSE ======================
CLOSE_RETRY_MAX   = 7
CLOSE_RETRY_SLEEP = 0.35

# ====================== STATE ======================
BALANCE       = 0.0
BALANCE_START = 0.0

TR   = {}  # {sym: [last prices]}
OB   = {}  # {sym: (bid_p, bid_q, ask_p, ask_q)}
OPEN = {}  # {sym: trade}
LAST_CLOSE = {}


# =======================
# عتبات فلتر الشمعة
# =======================
CANDLE_SPIKE_TH = 3.51   # عتبة الشمعة الشاذة
CANDLE_WINDOW   = 2     # نافذة الشموع لحساب المتوسط
# === أضف هذا السطر الجديد ===
CANDLE_RANGES = {}  # قاموس لتخزين نطاقات الشموع لكل رمز على حدة
# ============================



SYMBOL_FILTERS = {}
_EXINFO_MAP = None

IOBI_BUF = {}
D_BUF    = {}
LAST_D_AVG    = {}
LAST_IOBI_AVG = {}

STATS = {
"trades": 0, "wins": 0, "losses": 0, "pnl_usd": 0.0,
"tp": [0]*TP_LEVELS, "sl": 0, "esl": 0,
# "tp": [0]*15, "sl": 0, "esl": 0,
}

LAST_TRADES = []



LAST_TOPN_REFRESH = 0.0
TICKER_OFFSET     = 0

# =================== PLATFORM DATA ===================
USDT_FREE        = 0.0
TOTAL_EQUITY     = 0.0
DAY_PNL_USDT     = 0.0
DAY_START_EQUITY = 0.0
DAY_RESET_TS     = 0.0

# =================== SMART TOP_MAX CACHE =====================
_LAST_SMART_SYMS = []
_LAST_SMART_TS   = 0.0
_LAST_SMART_ERR  = 0.0
_ELITE_CACHE = set()
# =================== DEPTH CACHE =============================
DEPTH_IOBI = {}
DEPTH_LAST = {}





# ========== إعدادات التذبذب اللحظي ==========
VOLATILITY_INTRADAY_MIN = 0.000035    # 0.1% حد أدنى (عدل حسب رغبتك)
VOLATILITY_INTRADAY_MAX = 1
                                  # 5% حد أقصى (عدل حسب رغبتك)
VOLATILITY_WEIGHT       = 2.0        # وزن التذبذب في الترتيب (كلما زاد، كلما صار التذبذب أهم)
INTRADAY_INTERVAL       = '1m'       # الفترة: 1m, 5m, 15m إلخ
# ===========================================







# ============================================================
#               قسم ربط واجهة الويب (DO NOT TOUCH LOGIC)
# ============================================================
# =================== DEPTH WebSocket ======================
DEPTH_WS_MANAGER = None
ws_thread_twm = None 
DEPTH_WS_DATA = {}
DEPTH_WS_LOCK = threading.Lock()




# ================= PRICE HOLD (ANTI-DUMP) =================
ENABLE_PRICE_HOLD      = False       # تشغيل / إيقاف الفلتر
PRICE_HOLD_LOOKBACK    = 4        # عدد التيكات للمقارنة
PRICE_HOLD_EPS         = 0.00025   # 0.04% سماح هزة طبيعية


ENABLE_ANTI_ACCEL      = False
ACCEL_LOOKBACK         = 4        # عدد التيكات
ACCEL_RATIO_MAX        = 1.5      # تسارع ه




SELL_VOL_HISTORY = defaultdict(lambda: deque(maxlen=200))
TOTAL_VOL_HISTORY = defaultdict(lambda: deque(maxlen=200))  # حجم التداول الكلي (buy + sell)
BUY_VOL_HISTORY = defaultdict(lambda: deque(maxlen=200))    # حجم الشراء من العمق





# ====================== NEW TRAILING LOGIC ======================
# عند وصول الربح لهذه النسبة، يتم تفعيل التريلينج
TRAILING_ACTIVATE_PCT = TP_BASE_PCT  # نفس قيمة TP1 (0.29%)



# إغلاق قسري إذا وصل لمرحلة متقدمة جداً (اختياري)
HARD_CLOSE_LEVEL = 100  


# ====================== STATE ======================

# المتغيرات الجديدة (أضفها هنا)
trading_queue = Queue()
PENDING_BUYS = set()      # لمنع شراء العملة مرتين في نفس الوقت
PENDING_SELLS = set()     # لمنع البيع المزدوج
EXECUTOR_LOCK = threading.Lock()
BALANCE_LOCK = threading.Lock()
depth_calc_queue = Queue()

SAFE_PROFIT_TIMER = 10.0  # 10 ثواني


USER_DATA_STREAM = None


# إعداد المنفذ
PORT = 2020

# تعريف مكان ملف HTML
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


# ====================== MULTIPLE ENTRIES - LOSS CONDITION ======================
ENABLE_MULTIPLE_ENTRIES = True          # السماح بالدخول المتكرر لنفس الرمز
LOSS_CHECK_TIME = 20                  # 3 دقائق بالثواني
MAX_ALLOWED_LOSS_PCT = -7.00





# حاوية لتخزين آخر 50 رسالة للنظام
SYSTEM_LOGS = []
# قاموس لتخزين المستخدمين الذين فشلت مفاتيحهم مع وقت آخر محاولة
FAILED_USERS = {}  # {user_id: timestamp}
FAILURE_COOLDOWN = 600  # 10 دقائق (بالثواني)


# ============================================================
# 🛡️ MARKET DATA LOCK (لحماية البيانات المشتركة)
# ============================================================
MARKET_DATA_LOCK = threading.Lock()

# ====================== GLOBAL OPEN SYMBOLS (ALL USERS) ======================
GLOBAL_OPEN_SYMBOLS = set()   # رموز الصفقات المفتوحة من جميع المستخدمين


# قوائم البث
BEST_SYMBOLS = []   # قائمة بأفضل الرموز مع قوة المؤشر
WORST_SYMBOLS = []  # قائمة بأسوأ الرموز مع قوة المؤشر


# ================= DYNAMIC DAILY HIGH PROTECTION (معدل حسب الهدف) =================
DAILY_HIGH_CACHE = {}
DAILY_HIGH_CACHE_TTL = 60
ATR_CACHE = {}
ATR_CACHE_TTL = 300
ATR_PERIOD = 14
ATR_MULTIPLIER = 0.5
MIN_DISTANCE_PCT = TP_BASE_PCT * 1.2   # 0.65% تقريباً
BREAKOUT_FACTOR = 0.2
MIN_DAILY_DISTANCE = 0.015   # 1.5% حد أدنى
MAX_DAILY_DISTANCE = 0.03    # 3% حد أقصى

# ================= SHORT-TERM PEAK PROTECTION (آخر دقيقة تقريباً) =================
SHORT_PEAK_LOOKBACK = 40        # ≈ 40 تيكة = دقيقة (بمتوسط 1.5 ث/تيكة)
SHORT_PEAK_DISTANCE_PCT = 0.003 # 0.3% (نسبة مناسبة للقمم اللحظية)


# ================= DYNAMIC SHORT-TERM PEAK PROTECTION (باستخدام ATR) =================
MIN_DYNAMIC_DISTANCE = 0.0005    # 0.1% حد أدنى (حتى للعملات الهادئة)
MAX_DYNAMIC_DISTANCE = 0.01     # 1% حد أقصى (للعملات شديدة التقلب)
ATR_RATIO = 0.1                  # 30% من ATR تستخدم كمسافة

# --- إعدادات الرادار والسيولة ---
BTC_IS_SAFE = True  # المتغير العالمي
BTC_MOM_LIMIT      = 0.000  # (0.12%-) هبوط البيتكوين الذي يوقف البوت
Z_SCORE_LIMIT      = 1.8      # سقف الإجهاد الإحصائي (يمنع القمم)
Z_LOOKBACK         = 90       # نافذة حساب الانحراف (20 تيك)



# ====================== BLACKLIST SYSTEM ======================
# { "BTCUSDT": وقت_انتهاء_الحظر_timestamp }
VOL_DROP_BLACKLIST = {}
# القاموس الذي سيحتفظ ببيانات الـ 24 ساعة لكل العملات
TICKER_DATA = {}
BOOK_DATA = {}
BOOK_DATA_TIMESTAMPS = {}




twm_ops_lock = Lock()


# helper آمن لإيقاف socket
def safe_stop_socket(twm, sock_key):
    if not sock_key:
        return
    try:
        with twm_ops_lock:
            # تحقق سريع إن كان المفتاح موجوداً داخل هياكل twm
            if hasattr(twm, '_sockets') and sock_key in getattr(twm, '_sockets', {}):
                twm.stop_socket(sock_key)
                return
            if hasattr(twm, '_socket_running') and sock_key in getattr(twm, '_socket_running', {}):
                twm.stop_socket(sock_key)
                return
            # محاولة احتياطية: ابحث عن مفتاح مطابق جزئياً
            for k in list(getattr(twm, '_sockets', {}).keys()):
                if sock_key in k or k in sock_key:
                    try:
                        twm.stop_socket(k)
                    except Exception:
                        pass
                    return
    except KeyError:
        add_log(f"⚠️ safe_stop_socket KeyError ignored for {sock_key}")
    except Exception as e:
        add_log(f"⚠️ safe_stop_socket error: {e}")

# helper آمن لبدء المالتبلكس
def safe_start_multiplex(twm, symbol_list, callback):
    streams = sorted(dict.fromkeys([f"{s.lower()}@ticker" for s in symbol_list]))
    with twm_ops_lock:
        try:
            sock_id = twm.start_multiplex_socket(callback=callback, streams=streams)
        except Exception as e:
            add_log(f"❌ safe_start_multiplex start failed: {e}")
            return None
    # انتظر قليلاً حتى يسجل الـsocket داخلياً (حماية ضد race)
    for _ in range(10):
        try:
            if hasattr(twm, '_socket_running') and sock_id in getattr(twm, '_socket_running', {}):
                return sock_id
        except Exception:
            pass
        time.sleep(0.05)
    # في حال لم يظهر المفتاح بسرعة، نقبل القيمة التي أعيدت ونكمل (library قد تتعامل داخليًا)
    return sock_id



def start_btc_monitor(client):
    """دالة تبدأ مراقبة البيتكوين في خيط منفصل"""
    def monitor():
        global BTC_IS_SAFE
        while True:
            try:
                # جلب آخر 10 تيكات للبيتكوين مباشرة من الكلاينت أو الـ TR
                btc_history = client.get_ticker_history('BTCUSDT', limit=20)
                
                if len(btc_history) >= 20:


                    # 1. قياس الزخم اللحظي (آخر 5 تيكات)
                    current_mom = (btc_history[-1] - btc_history[-5]) / btc_history[-5]
                    # 2. قياس الزخم الأكبر (آخر 20 تيك)
                    macro_mom = (btc_history[-1] - btc_history[-20]) / btc_history[-20]
                    # حساب الزخم (Momentum)

                    # أ- إذا كان هناك انهيار ماكرو (Macro Dump)، نغلق الأبواب فوراً
                    if macro_mom < BTC_MOM_LIMIT: # هبوط 0.20% في وقت قصير
                        BTC_IS_SAFE = False
                    elif current_mom > 0.0001: # تأكيد ارتداد بسيط (0.02%)
                        BTC_IS_SAFE = True
  
                        pass


                # فحص كل ثانية واحدة لضمان الدقة العالية
                time.sleep(1) 
            except Exception as e:
                print(f"⚠️ BTC Radar Error: {e}")
                time.sleep(5)

    # تشغيل الرادار في الخلفية لكي لا يعطل البوت الرئيسي
    threading.Thread(target=monitor, daemon=True).start()






def get_z_score_status(price, history):
    """حساب الحالة الإحصائية للسعر الحالي"""
    if len(history) < Z_LOOKBACK:
        return True # لا توجد بيانات كافية للحكم
        
    window = history[-Z_LOOKBACK:]
    avg_p = sum(window) / Z_LOOKBACK
    variance = sum((x - avg_p) ** 2 for x in window) / Z_LOOKBACK
    std_dev = variance ** 0.5
    
    if std_dev == 0: return True
    
    z_score = (price - avg_p) / std_dev
    return z_score <= Z_SCORE_LIMIT # يعيد True إذا كان السعر غير مبالغ فيه



def get_server_public_ip():
    """جلب عنوان IP العام للخادم باستخدام خدمة خارجية"""
    try:
        response = requests.get('https://api.ipify.org', timeout=5)
        if response.status_code == 200:
            return response.text.strip()
    except Exception as e:
        print(f"⚠️ Failed to get public IP: {e}")
    return "Unable to detect IP"  # قيمة افتراضية في حال الفشل

# جلب IP مرة واحدة عند بدء التشغيل
ENGINE_IP = get_server_public_ip()













def get_historical_avg_volume(sym, period_minutes=1, num_candles=20):
    """
    جلب متوسط الحجم التاريخي للرمز
    period_minutes: فترة الشمعة (5 دقائق مثلاً)
    num_candles: عدد الشموع التاريخية لحساب المتوسط
    """
    try:
        # تحديد الفترة المناسبة
        interval = f"{period_minutes}m"
        
        klines = _jget(f"/api/v3/klines", params={
            "symbol": sym,
            "interval": interval,
            "limit": num_candles + 1  # +1 لأننا سنستثني الشمعة الحالية
        }, timeout=5)
        
        if not klines or len(klines) < num_candles:
            return None
        
        # استخراج أحجام الشموع التاريخية (استبعاد الشمعة الحالية)
        volumes = [float(k[5]) for k in klines[:-1]]
        
        if not volumes or len(volumes) < 10:
            return None
        
        # حساب المتوسط
        avg_volume = sum(volumes) / len(volumes)
        
        return avg_volume
        
    except Exception as e:
        return None


def get_current_candle_volume(sym, period_minutes=1):
    """
    جلب حجم الشمعة الحالية
    """
    try:
        interval = f"{period_minutes}m"
        
        klines = _jget(f"/api/v3/klines", params={
            "symbol": sym,
            "interval": interval,
            "limit": 1
        }, timeout=5)
        
        if not klines or len(klines) == 0:
            return None
        
        current_volume = float(klines[0][5])
        return current_volume
        
    except Exception:
        return None


def calculate_rvol(sym):
    """
    حساب RVOL = Current Volume / Average Volume (Historical)
    يستخدم كاش لتقليل الطلبات
    """
    global RVOL_CACHE
    
    now = time.time()
    
    # التحقق من الكاش
    if sym in RVOL_CACHE:
        cached = RVOL_CACHE[sym]
        if (now - cached['timestamp']) < RVOL_CACHE_TTL:
            # الكاش صالح، نحسب RVOL باستخدام المتوسط المخزن
            avg_vol = cached['avg_volume']
            current_vol = get_current_candle_volume(sym, RVOL_PERIOD)
            
            if current_vol is None or avg_vol is None or avg_vol <= 0:
                return None
            
            rvol = current_vol / avg_vol
            return rvol
    
    # الكاش غير صالح، نجلب البيانات الجديدة
    avg_volume = get_historical_avg_volume(sym, RVOL_PERIOD, 30)
    
    if avg_volume is None:
        return None
    
    # تحديث الكاش
    RVOL_CACHE[sym] = {
        'avg_volume': avg_volume,
        'timestamp': now
    }
    
    # جلب الحجم الحالي
    current_volume = get_current_candle_volume(sym, RVOL_PERIOD)
    
    if current_volume is None or avg_volume <= 0:
        return None
    
    rvol = current_volume / avg_volume
#    add_log(f"❌ {sym}: current_volume {current_volume:.2f}  الفوليوم الحالي    avg_volume:  {avg_volume:.2f} rvol:{rvol:.2f} ")

    return rvol





def calculate_s_score(sym, iobi_val):


    # فحص حداثة بيانات BOOK_DATA (الوكلاء: الإشارات القديمة قاتلة)
    if sym in BOOK_DATA_TIMESTAMPS:
        if time.time() - BOOK_DATA_TIMESTAMPS[sym] > 5.0:
            return None, None

    # 1. حساب مكون IOBI
    iobi_component = iobi_val * IOBI_WEIGHT
    
    # 2. حساب RVOL
    rvol = calculate_rvol(sym)
    if rvol is None:
        return None, None
    
    # تطبيع RVOL لتكون في نطاق معقول (0-1 تقريباً)
    # RVOL = 1 يعني حجم عادي، > 1 يعني حجم أعلى من المعتاد
    # سنستخدم log لتطبيع القيم الكبيرة
    normalized_rvol = math.log(1 + rvol)  # log(1+x) يعطي قيم معتدلة
    rvol_component = normalized_rvol * RVOL_WEIGHT
    
    # 3. حساب مكون السبريد
    if sym in BOOK_DATA:
        bid_p, _, ask_p, _ = BOOK_DATA[sym]
        if bid_p > 0 and ask_p > 0:
            spread = (ask_p - bid_p) / bid_p
            if spread > 0:
                # 0.01/spread يعطي قيمة أكبر عندما السبريد أصغر (أفضل)
                spread_component = (0.01 / spread) * SPREAD_WEIGHT
                # تطبيع لتجنب قيم خيالية
                spread_component = min(spread_component, 0.5)  # سقف 0.5
            else:
                return None, None
        else:
            return None, None
    else:
        return None, None
    
    # 4. حساب S Score النهائي
    s_score = iobi_component + rvol_component + spread_component
    
    return s_score, rvol


# ============================================================
# 🧠 PHASE 2: USER ENGINE CLASS (محرك المستخدم المعزول)
# ============================================================

class UserEngine:
    def __init__(self, session_id, user_id, api_key, api_secret, config_payload):



        self.session_id = session_id
        self.user_id = user_id


        self.ACTIVE_FOR_ENTRY = set()
        self.last_topn_refresh = 0.0  # <-- إضافة هذا السطر




                # ====== ثوابت الرادار (بدون config) ======
        self.BTC_SYMBOL = "BTCUSDT"
        self.SAFE_LIMIT = -1.0          # إيقاف لو BTC هبط 1%
        self.TIME_WINDOW = "1m"
        self.CANDLE_NUMBER = 15
        self.BTC_CHECK_TTL = 5.0
        self._btc_fail_limit = 5

        # ====== كاش داخلي لكل يوزر ======
        self._last_btc_ts = 0.0
        self._last_btc_change = None
        self._btc_fail_count = 0

        
                # أضف هذه السطور داخل __init__ في UserEngine
        self.last_seen = time.time()  # للتحقق من Heartbeat
        self.user_ws_manager = None    # لحفظ مرجع WebSocket الخاص بهذا المستخدم
        self.listen_key = None         # لحفظ مفتاح الاستماع

        # --- 1. ضع هذا الجزء هنا في الأعلى (قبل فحص العميل) ---
        sys_conf = config_payload.get("system", {})
        self.dry_run = sys_conf.get("dry_run", False)

        # استبدل هذا القسم بالكامل (من try: إلى else:)
        if not self.dry_run and api_key and api_secret:
            try:
                self.client = Client(api_key, api_secret)
                print(f"✅ تم تهيئة العميل للمستخدم {user_id}")
            except Exception as e:
                print(f"❌ خطأ في العميل: {e}")
                self.client = None
        else:
            self.client = None
            print(f"ℹ️ وضع التجربة (Dry Run) لمستخدم {user_id}")






        self.BALANCE = 1000.0 if self.dry_run else 0.0
        self.BALANCE_START = self.BALANCE

        # تحديث الرصيد من Binance إذا كان العميل موجودًا
        if self.client and not self.dry_run:
            add_log(f"🔍 [{self.user_id}] تحديث الرصيد الأولي فور بدء الجلسة")
            self.update_balance_from_exchange(force=True)



        # --- 2. إعدادات المستخدم (من الـ Payload) ---
        exch_conf = config_payload.get("exchange", {})
        sys_conf = config_payload.get("system", {})
        
        self.order_size = sys_conf.get("order_size", 150.0) # SPEND الخاص بي
        self.enhance_multiplier = 2.0  # يمكنك تغيير هذا الرقم بسهولة لاحقاً
        self.dry_run = sys_conf.get("dry_run", False)
        self.can_trade = sys_conf.get("can_trade", True)
        self.kill_switch = sys_conf.get("kill_switch", False)
        self.engine_status = "running"

        # --- 3. الحالة الداخلية للبوت (State) ---
        # بدلاً من المتغيرات العامة، كل مستخدم له حالته الخاصة
        self.OPEN = {}          # صفقاتي المفتوحة {sym: trade_data}
        self.BALANCE = 0.0      # رصيدي
        self.PENDING_BUYS = set()
        self.PENDING_SELLS = set()
        
        # Buffers خاصة بي لحساباتي
        self.IOBI_BUF = {}
        self.D_BUF = {}


        for sym, buf in IOBI_BUF.items():
            if sym not in self.IOBI_BUF:
                self.IOBI_BUF[sym] = buf[-IOBI_WINDOW:]  # آخر قيمتين
        for sym, buf in D_BUF.items():
            if sym not in self.D_BUF:
                self.D_BUF[sym] = buf[-D_WINDOW:]      


        self.LAST_CLOSE = {}   # {sym: timestamp}
        self.CANDLE_RANGES = {}
        
        # إحصائياتي الخاصة
        self.STATS = {
            "trades": 0, "wins": 0, "losses": 0, "pnl_usd": 0.0,
            "tp": [0]*TP_LEVELS, "sl": 0, "esl": 0,
            "total_trade_volume": 0.0,
        }
        
        self.last_balance_update = 0

        self.logic_thread = threading.Thread(target=self.logic_heartbeat, daemon=True)
        self.logic_thread.start()











    def logic_heartbeat(self):
   
        while True:
            start_time = time.time()

            self.last_seen = time.time() 
            if self.kill_switch or self.engine_status != "running":
                time.sleep(0.1)
                continue


            if time.time() - self.last_balance_update > 30:
                self.update_balance_from_exchange()




            self.refresh_top_n(list(TR.keys()))

            if len(self.ACTIVE_FOR_ENTRY) == 0:
                pass 
                print(f"⚠️ [{self.user_id}] ACTIVE_FOR_ENTRY فارغ!")
            else:
            
                pass

            # فحص الرموز النشطة فقط
            for sym in list(self.ACTIVE_FOR_ENTRY):
                try:
                    # التحقق من وجود بيانات السعر
                    with MARKET_DATA_LOCK:
                        if sym not in TR or not TR[sym]:
                            continue
                        current_price = TR[sym][-1]
                        price_history = TR[sym]
                        current_iobi = iobi(sym)

                    if sym in self.OPEN:
                        self._try_close_logic(sym, current_price)
                        self._try_open_logic(sym, current_price, price_history, current_iobi)
                    else:
                        self._try_open_logic(sym, current_price, price_history, current_iobi)

                except Exception as e:
                    add_log(f"❗ Logic heartbeat error for user {self.user_id}, {sym}: {e}")

            elapsed = time.time() - start_time
            sleep_time = max(0.001, 0.05 - elapsed)  # 20Hz
            time.sleep(sleep_time)





    def refresh_top_n(self, current_syms):
        now = time.time()
        if now - self.last_topn_refresh < TOPN_REFRESH_SEC:
            return
        self.last_topn_refresh = now

        vols = []
        for s in current_syms:
            arr = TR.get(s, [])
            if len(arr) >= 2 and arr[-2] != 0:
                v = abs((arr[-1] - arr[-2]) / arr[-2])
                vols.append((v, s))
        vols.sort(reverse=True)
        top_syms = [s for v, s in vols[:TOP_N_VOL]]




        for s in self.OPEN.keys():
            if s not in top_syms:
                top_syms.append(s)

        self.ACTIVE_FOR_ENTRY.update(top_syms)





    def update_balance_from_exchange(self, force=False):
        """تحديث الرصيد من Binance مع إمكانية force وإعادة محاولة"""
        if self.dry_run or not self.client:
            return
        try:
            now = time.time()
            if not force and now - self.last_balance_update < 30:
                return

            
            # محاولة جلب الرصيد مع إعادة المحاولة 3 مرات
            for attempt in range(3):
                try:
                    b = self.client.get_asset_balance(asset="USDT")
                    old_balance = self.BALANCE
                    self.BALANCE = float(b["free"])
                    self.last_balance_update = now
                    return
                except Exception as e:
                    add_log(f"⚠️ [{self.user_id}] محاولة {attempt+1} فشلت: {repr(e)}")
                    if attempt < 2:
                        time.sleep(2)  # انتظر قبل إعادة المحاولة
                    else:
                        raise e  # فشلت كل المحاولات
        except Exception as e:
            add_log(f"❌ [{self.user_id}] فشل تحديث الرصيد نهائياً: {repr(e)}")
    # ==========================================================
    # 🧠 العقل المدبر (Main Logic - process_tick)
    # ==========================================================
    
    def process_tick(self, sym):
        """
        هذه الدالة تستدعى في كل "تيك" سعري لكل مستخدم.
        تقرأ البيانات من "المخزن العالمي" (Global TR, OB, DEPTH_IOBI).
        """
        
        # 1. فحص التباطل والإيقاف
        if self.kill_switch or not self.can_trade or self.engine_status != "running":
            return

        # 2. قراءة البيانات المشتركة (Thread-Safe Read)
        # نستخدم القفل لضمان قراءة بيانات متماسكة
        with MARKET_DATA_LOCK:
            if sym not in TR or len(TR[sym]) == 0:
                return # لا توجد بيانات لهذا الرمز بعد
            
            # نسخ البيانات للمعالجة السريعة
            current_price = TR[sym][-1]
            price_history = TR[sym] # التاريخ الكامل (للفلاتر المعقدة)
     
            current_iobi = iobi(sym)
            ob_data = OB.get(sym) # (bid, bid_q, ask, ask_q)



            
    
        # 3. تشغيل منطق الدخول (Open Logic)
        self._try_open_logic(sym, current_price, price_history, current_iobi)
        
        # 4. تشغيل منطق الخروج (Close Logic)
        self._try_close_logic(sym, current_price)





    def _can_add_to_existing_position(self, sym, current_price):
            """التحقق من إمكانية إضافة كمية جديدة (تعزيز) بناءً على الخسارة فقط ولمرة واحدة"""
            
            # 1. التحقق من التفعيل العام والمحلي
            if not ENABLE_MULTIPLE_ENTRIES:
                return False
            if sym not in self.OPEN:
                return False

            t = self.OPEN[sym]

            # 2. القفل (مرة واحدة فقط): إذا تم التعزيز سابقاً اخرج فوراً
            if t.get("enhancement_used", False):
                # add_log(f"can_add: {sym} enhancement already used")
                return False


            if t.get("entries_count", 1) > 1:
                return False


            # 3. فحص الوقت (اختياري، لضمان عدم التعزيز فور فتح الصفقة)
            open_time = t.get("open_time", 0)
            age = time.time() - open_time
            if age < LOSS_CHECK_TIME:
                return False

            # 4. جلب السعر الحالي إذا لم يكن مرر للدالة
            if current_price is None:
                if sym in TR and TR[sym]:
                    current_price = TR[sym][-1]
                else:
                    return False

            # 5. حساب نسبة الخسارة
            avg_entry = float(t.get("avg_entry", 0.0))
            if avg_entry <= 0:
                return False

            profit_pct = (current_price - avg_entry) / avg_entry * 100.0


            if profit_pct <= MAX_ALLOWED_LOSS_PCT:
                add_log(f"🚀 ENHANCE TRIGGERED: {sym} | Loss: {profit_pct:.2f}% (Threshold: {MAX_ALLOWED_LOSS_PCT}%)")
                return True

            # تسجيل الحالة للتصحيح (اختياري)
            # add_log(f"can_add: {sym} Loss={profit_pct:.2f}%, not reached threshold yet")
            return False



    # ========== BTC radar (instance-safe) ==========
    def get_current_btc_change(self):
        """إرجاع نسبة التغير (%) خلال آخر CANDLE_NUMBER شمعة.
        يعيد None عند فشل أو بيانات ناقصة."""
        now = time.time()
        # كاش بسيط per-instance
        if now - self._last_btc_ts < self.BTC_CHECK_TTL and self._last_btc_change is not None:
            return self._last_btc_change

        try:
            klines = self.client.get_klines(symbol=self.BTC_SYMBOL, interval=self.TIME_WINDOW, limit=self.CANDLE_NUMBER)
            if not klines or len(klines) < self.CANDLE_NUMBER:
               
                self._last_btc_ts = now
                self._last_btc_change = None
                return None

            closes = [float(k[4]) for k in klines]
            first_close = closes[0]
            last_close = closes[-1]
            change_pct = (last_close - first_close) / first_close * 100.0

            self._last_btc_ts = now
            self._last_btc_change = change_pct
            return change_pct

        except Exception as e:
            
            self._last_btc_ts = now
            self._last_btc_change = None
            return None







































    def get_rvol_15m(self, sym):
        try:
            # حساب المتوسط التاريخي لـ 20 شمعة 15 دقيقة
            url_avg = f"https://api.binance.com/api/v3/klines?symbol={sym}&interval=1m&limit=21"
            resp_avg = requests.get(url_avg, timeout=5)
            if resp_avg.status_code != 200:
                return None
            klines_avg = resp_avg.json()
            if len(klines_avg) < 21:
                return None
            # متوسط الحجم لآخر 20 شمعة (قبل الحالية)
            avg_volume = sum(float(k[5]) for k in klines_avg[:-1]) / 20
            
            # حجم الشمعة الحالية (لا تزال مفتوحة)
            current_vol = float(klines_avg[-1][5]) if klines_avg else 0
            if avg_volume <= 0:
                return None
            rvol = current_vol / avg_volume
            return rvol
        except Exception as e:
            add_log(f"RVOL 15m error {sym}: {e}")
            return None




    def get_sma20_and_drop(self, sym):
        """تعيد (sma20, drop_percentage) أو (None, None) إذا فشل"""
        try:
            url = f"https://api.binance.com/api/v3/klines?symbol={sym}&interval=15m&limit=21"
            resp = requests.get(url, timeout=5)
            if resp.status_code != 200:
                return None, None
            klines = resp.json()
            if len(klines) < 21:
                return None, None
            
            # آخر 20 شمعة كاملة (قبل الشمعة الحالية)
            closes = [float(k[4]) for k in klines[:-1]]
            sma20 = sum(closes) / 20
            
            # السعر الحالي (آخر Close من الشمعة التي لا تزال مفتوحة؟)
            # نأخذ سعر السوق الحالي من TR[sym][-1] بدلاً من Close غير المكتمل
            current_price = TR.get(sym, [None])[-1]
            if not current_price:
                return None, None
            
            drop_pct = ((sma20 - current_price) / sma20) * 100
            return sma20, drop_pct
        except Exception as e:
            add_log(f"SMA20 error {sym}: {e}")
            return None, None

    def get_last_completed_candle(self, sym):
        try:
            url = f"https://api.binance.com/api/v3/klines?symbol={sym}&interval=1m&limit=3"
            resp = requests.get(url, timeout=5)
            if resp.status_code != 200:
                return None
            klines = resp.json()
            if len(klines) < 2:
                return None
            # klines[-2] هي الشمعة المغلقة، klines[-1] هي الحالية
            candle = {
                'open': float(klines[-2][1]),
                'high': float(klines[-2][2]),
                'low': float(klines[-2][3]),
                'close': float(klines[-2][4]),
                'prev_open': float(klines[-3][1]) if len(klines) > 2 else 0,
                'prev_close': float(klines[-3][4]) if len(klines) > 2 else 0,
                'prev_low': float(klines[-3][3]) if len(klines) > 2 else 0
            }
            return candle
        except Exception as e:
            add_log(f"Candle error {sym}: {e}")
            return None


            

    def check_candle_conditions(self, candle):
        """كل الشروط تعتمد على آخر شمعة مغلقة"""
        if not candle:
            return False, ""
        
        # 1. Green Trigger
        close = candle['close']
        open_ = candle['open']
        if close <= open_:
            return False, "Not green candle"
        
        prev_open = candle['prev_open']
        prev_close = candle['prev_close']
        mid_prev = (prev_open + prev_close) / 2
        if close <= mid_prev:
            return False, "Close not above previous mid"
        
        # 2. Wick Rejection (LowerWick > Body * 2)
        body = abs(close - open_)
        lower_wick = min(open_, close) - candle['low']
        if lower_wick <= (body * 2):
            return False, f"Wick too small: {lower_wick} vs {body*2}"
        
        prev_low = candle.get('prev_low', 0)
        if prev_low > 0 and candle['low'] <= prev_low:
            return False, "New low made"
        return True, "OK"

    # نعدل دالة get_last_completed_candle لتشمل prev_low
    # (أضف داخل القاموس السطر: 'prev_low': float(klines[-2][3]) إذا توفرت)


    def _try_open_logic(self, sym, price, price_history, iobi_val):
        """
        استراتيجية الدخول الجديدة:
        1. نزول السعر عن SMA20 (فريم 15 دقيقة) بنسبة >= 4%
        2. شروط الشمعة التأكيدية (Green Trigger, Wick Rejection, No New Low)
        3. RVOL بين 1.5 و 7
        """
        # ================= BASIC GUARDS (لم نلمسها) =================
        if self.BALANCE < self.order_size:
            return

        if len(self.OPEN) + len(self.PENDING_BUYS) >= MAX_OPEN:
            return

        if sym in self.PENDING_BUYS:
            return
        if self.ACTIVE_FOR_ENTRY and sym not in self.ACTIVE_FOR_ENTRY:
            return

        # (تم إزالة شرط BTC_IS_SAFE)

        # ===== فترة تهدئة (اختياري، يمكنك إلغاؤها) =====
        if ENFORCE_MIN_COOLDOWN and sym in self.LAST_CLOSE:
            if time.time() - self.LAST_CLOSE[sym] < MIN_COOLDOWN_SECONDS:
                return

        # ========== 1. شرط النزول عن SMA20 بنسبة 4% ==========
        sma20, drop_pct = self.get_sma20_and_drop(sym)
        if sma20 is None or drop_pct is None:
            return
        if drop_pct > -1.0:   # النسبة المطلوبة 4% أو أكثر
          #  add_log(f"⏳ {sym} drop {drop_pct:.2f}%> 4%")
            return

        # ========== 2. جلب آخر شمعة 15 دقيقة مغلقة ==========
        candle = self.get_last_completed_candle(sym)
        if not candle:
            return

        # ========== 3. الشروط الداخلية (Green Trigger, Wick, No New Low) ==========
        ok, reason = self.check_candle_conditions(candle)
        if not ok:
            add_log(f"❌ {sym} candle conditions fail: {reason}")
            return

        # ========== 4. RVOL بين 1.5 و 7 ==========
        rvol = self.get_rvol_15m(sym)
        if rvol is None:
            return
        if not (3.0 <= rvol <= 7.0):
            add_log(f"❌ {sym} RVOL {rvol:.2f} out of range [1.5,7]")
            return

        # ========== 5. كل الشروط تحققت → تنفيذ الشراء ==========
        add_log(f"✅ {sym} ALL CONDITIONS MET: drop={drop_pct:.2f}%, RVOL={rvol:.2f}")

        # تحديد سعر الدخول (آخر سعر معروف)
        last = price if price > 0 else (price_history[-1] if price_history else 0)
        if last <= 0:
            return

        # تحديد حجم الصفقة (مع دعم التعزيز إن وجد – لم نلمسه)
        is_enhancing = sym in self.OPEN
        if is_enhancing:
            if not self._can_add_to_existing_position(sym, last):
                return
            self.OPEN[sym]["enhancement_used"] = True
            self.OPEN[sym]["entries_count"] = self.OPEN[sym].get("entries_count", 1) + 1
            current_multiplier = getattr(self, 'enhance_multiplier', 2.0)
            msg_prefix = "🚀 ENHANCING"
        else:
            current_multiplier = 1.0
            msg_prefix = "🆕 OPENING"

        # حجم الصفقة (مع volatility sizing إذا أردت الاحتفاظ به – لم يطلب إلغاءه)
        if USE_VOLATILITY_SIZING:
            arr = price_history[-REGIME_WINDOW:] if len(price_history) >= REGIME_WINDOW else price_history
            true_ranges = []
            for i in range(1, len(arr)):
                tr = max(arr[i] - arr[i-1], abs(arr[i-1] - arr[i]))
                true_ranges.append(tr)
            atr = sum(true_ranges) / len(true_ranges) if true_ranges else (last * 0.001)
            if atr > 0:
                risk_capital = self.BALANCE * TARGET_VOLATILITY_EXPOSURE
                dollar_vol_distance = atr * ATR_MULTIPLIER_FOR_SIZE
                if dollar_vol_distance > 0:
                    adaptive_order_size = risk_capital / dollar_vol_distance
                    final_order_size = min(adaptive_order_size, self.order_size * current_multiplier)
                    final_order_size = max(final_order_size, 10.0)
                else:
                    final_order_size = self.order_size * current_multiplier
            else:
                final_order_size = self.order_size * current_multiplier
        else:
            final_order_size = self.order_size * current_multiplier

        qty = final_order_size / last

        add_log(f"{msg_prefix}: {sym} | Size: {final_order_size:.2f} USDT (Mult: {current_multiplier}x)")

        entry_volume_24h = 0
        if sym in TICKER_DATA:
            entry_volume_24h = float(TICKER_DATA[sym].get('quoteVolume', 0))

        self.PENDING_BUYS.add(sym)
        trading_queue.put({
            'cmd': 'BUY',
            'user_id': self.user_id,
            'session_ref': self,
            'sym': sym,
            'price': last,
            'entry_volume_24h': entry_volume_24h,
            'config': {'order_size': final_order_size}
        })



































    def close_all_positions_immediately(self):
        """إغلاق جميع الصفقات المفتوحة فوراً بأمر سوق"""
        if not self.OPEN:
            add_log(f"ℹ️ [{self.user_id}] لا توجد صفقات مفتوحة للإغلاق.")
            return

        opened_symbols = list(self.OPEN.keys())
        add_log(f"⚠️ [{self.user_id}] جاري إغلاق {len(opened_symbols)} صفقة بسبب أمر STOP...")

        for sym in opened_symbols:
            t = self.OPEN[sym]
            entry = t.get('avg_entry', 0)
            qty = t.get('total_qty', 0)

            # نضع العملية في طابور التنفيذ لإغلاقها فوراً
            # نستخدم is_esl=True لتجاوز شروط الحماية (مثل شرط الوصول لـ TP1)
            with EXECUTOR_LOCK:
                if sym in self.PENDING_SELLS: continue
                self.PENDING_SELLS.add(sym)
                
                trading_queue.put({
                    'cmd': 'SELL',
                    'user_id': self.user_id,
                    'session_ref': self,            
                    'sym': sym,
                    'qty': qty,
                    'entry': entry,
                    'exec_price': 0, # سيتم استخدام سعر السوق
                    'level': 0,
                    'is_sl': False,
                    'is_esl': True, # مهم جداً لتجاوز فلاتر السعر
                    'is_force_stop': True # علامة إضافية للوجات
                })




    # ==========================================================
    # 📈 منطق الخروج (Exit Logic)
    # ==========================================================
    def _try_close_logic(self, sym, current_price):
        """دالة الإغلاق المعدلة مع النظام الهجين"""
        if sym not in self.OPEN:
            return
        
        t = self.OPEN[sym]  # <-- أضف هذا السطر هنا

        if time.time() - t.get('open_time', 0) < 0.8:
            return



        # newwwwwwwwww for delet duble cat
        if self.OPEN[sym].get('closing', False):
            return
        

        # end  newwwwwwwwww for delet duble cat



        
        # نتحقق من وجود الرمز في البيانات العالمية
        if sym not in TR or not TR[sym]:
            return
    

    
        t = self.OPEN[sym]


        # end  newwwwwwwwww for delet duble cat


        # ✅ منع تكرار إرسال أمر البيع عند TP1
        if t.get('tp1_triggered', False):
            return


        # end  newwwwwwwwww for delet duble cat



        last = current_price # القيمة الممرة من process_tick



        
        # تحديث أعلى سعر
        if last > t.get("highest_price", last):
            t["highest_price"] = last

        entry = t["avg_entry"]




        target_pct = t.get('target_pct', TP_BASE_PCT)   # قيمة احتياطية



        tp1_price = entry * (1 + target_pct + SLIPPAGE_BUFFER_PCT)






        # ========== 🛡️ منطق التعزيز (Enhancement Logic) ==========
        # 1. جلب البيانات الأساسية
        # نستخدم first_entry_price لحساب النسبة من أول صفقة، وليس المتوسط
        first_entry = t.get('first_entry_price', t['avg_entry'])
        base_size = t.get('base_order_size', 0)
        
        # 2. حساب نسبة الربح/الخسارة الحالية بالنسبة لسعر الدخول الأول
        if first_entry > 0:
            pnl_pct = (current_price - first_entry) / first_entry
            
            # 3. شرط إيقاف الخسارة القصوى (Stop Loss at -55%)
            if pnl_pct <= -0.55:
                add_log(f"🛑 STOP LOSS HIT: {sym} dropped to {pnl_pct*100:.2f}%")
                # تنفيذ إغلاق فوري (مشابه لمنطق الهروب الطارئ)
                with EXECUTOR_LOCK:
                    if sym not in self.PENDING_SELLS:
                        self.PENDING_SELLS.add(sym)
                        trading_queue.put({
                            'cmd': 'SELL',
                            'user_id': self.user_id,
                            'session_ref': self,            
                            'sym': sym,
                            'qty': t['total_qty'],
                            'entry': t["avg_entry"],
                            'exec_price': current_price,
                            'level': 'STOP_LOSS_ENHANCEMENT', 
                            'is_sl': True, 
                            'is_esl': False,
                            'is_timeout': False
                        })
                        t['closing'] = True
                return # إنهاء الدالة لمنع المزيد من المعالجة



            if base_size > 0 and pnl_pct < 0:
                # تعريف المستويات الثابتة (نسبة الخسارة، المبلغ بالدولار)
#                enhancement_levels = [
 #                   (0.0030, 90.0),   # مستوى 1
  #                  (0.0080, 160.0),  # مستوى 2
   #                 (0.0144, 450.0),  # مستوى 3
    #            ]

                enhancement_levels = [
                    (0.0025, 60.0),   # مستوى 1
                    (0.0050, 126.0),  # مستوى 2
                    (0.0075, 352.0),  # مستوى 3
                ]

                triggered = t.get('enhanced_levels_triggered', [])
                loss_pct = abs(pnl_pct)
                
                # 🛡️ فحص الحماية من النظام – يمنع أي تعزيز إذا كان السوق هابطاً بقوة
                skip_all_enhancements = False
                if USE_REGIME_FILTER:
                    sym_history = TR.get(sym, [])
                    if len(sym_history) >= REGIME_WINDOW:
                        is_ranging, _ = estimate_market_regime(sym_history)
                        mom = momentum(sym)
                        if not is_ranging and mom < 0:
                            add_log(f"⛔ [{sym}] منع التعزيز: السوق اتجاهي هابط (Regime Protection)")
                            skip_all_enhancements = True

                # التعزيز يحدث فقط إذا لم نقرر تخطيه
                if not skip_all_enhancements:
                    for idx, (threshold, amount_usd) in enumerate(enhancement_levels):
                        if idx not in triggered and loss_pct >= threshold - 1e-9:
                            t['enhanced_levels_triggered'] = triggered + [idx]
                            self._trigger_enhancement_order(sym, current_price, base_size, idx+1, 0.0, fixed_usd=amount_usd)
                            t['last_enhancement_price'] = current_price
                            if idx == 2:  # المستوى الثاني (الأخير الآن)
                                t['third_enhancement_price'] = current_price
                                t['tp_sl_active'] = True   # تفعيل الوقف المتحرك
                            break




            # وقف الخسارة بعد التعزيز الثالث فقط
            # ========== منطق وقف الخسارة الديناميكي (Regime-Aware Dynamic Trailing) ==========
            if t.get('tp_sl_active', False):
                # حساب ATR الحالي لتحديد مسافة الوقف
                arr = TR.get(sym, [current_price] * REGIME_WINDOW)[-REGIME_WINDOW:]
                true_ranges = []
                for i in range(1, len(arr)):
                    tr = max(arr[i] - arr[i-1], abs(arr[i-1] - arr[i]))
                    true_ranges.append(tr)
                atr = sum(true_ranges) / len(true_ranges) if true_ranges else (current_price * 0.005)
                atr_ratio = atr / current_price if current_price > 0 else 0.005

                # اختيار مضاعف ATR حسب نظام السوق (من دروس مولتبوك)
                is_ranging_now, _ = estimate_market_regime(arr)
                if is_ranging_now:
                    atr_mult = 0.25   # سوق متذبذب: نعطي مساحة أكبر
                else:
                    atr_mult = 0.20   # سوق اتجاهي: وقف أقرب
        
                # مسافة ديناميكية بحدود دنيا وعليا (0.8% ~ 4%)



                iobi_now = iobi(sym)

                base_distance = atr_mult * atr_ratio



                if iobi_now < -0.30:
                    base_distance *= 0.25
                    # في حالات الذعر، الحد الأدنى 1.5% والحد الأقصى 5%
                    dynamic_distance = max(0.0015, min(0.005, base_distance))
                    add_log(f"⚠️ [{sym}] IOBI extremely oversold ({iobi_now:.2f}), widened stop to {dynamic_distance*100:.2f}%")

                else:
                    # في الحالات العادية، الحد الأدنى 0.8% والحد الأقصى 4%
                    dynamic_distance = max(0.008, min(0.004, base_distance))




                # إنشاء الوقف لأول مرة
                if 'trailing_sl' not in t:
                    third_price = t.get('third_enhancement_price', current_price)
                    t['trailing_sl'] = third_price * (1 - dynamic_distance)
                    t['highest_since_third'] = third_price
                    add_log(f"🔒 [{sym}] Dynamic Trailing Stop activated at {t['trailing_sl']:.8f} ({dynamic_distance*100:.2f}% distance)")

                # تحديث أعلى سعر وتحديث الوقف
                if current_price > t.get('highest_since_third', current_price):
                    t['highest_since_third'] = current_price
                    new_sl = current_price * (1 - dynamic_distance)
                    if new_sl > t['trailing_sl']:
                        old_sl = t['trailing_sl']
                        t['trailing_sl'] = new_sl
                        add_log(f"📈 [{sym}] Trailing Stop raised: {old_sl:.8f} → {new_sl:.8f}")

                # التحقق من وصول السعر للوقف (مع السماح بمرور تشبع بيعي حاد)
                if current_price <= t['trailing_sl']:
                    add_log(f"🛑 [{sym}] STOP LOSS (TRAILING): Price {current_price:.8f} <= Stop {t['trailing_sl']:.8f}. Closing.")
                    with EXECUTOR_LOCK:
                        if sym not in self.PENDING_SELLS:
                            self.PENDING_SELLS.add(sym)
                            trading_queue.put({
                                'cmd': 'SELL',
                                'user_id': self.user_id,
                                'session_ref': self,
                                'sym': sym,
                                'qty': t['total_qty'],
                                'entry': t["avg_entry"],
                                'exec_price': current_price,
                                'level': 'ENHANCEMENT_TRAILING_SL',
                                'is_sl': True,
                                'is_esl': False,
                                'is_timeout': False
                            })
                            t['closing'] = True
                            t['sl_after_third_closed'] = True
                    return
        # ========== نهاية منطق التعزيز ==========




        # ========== نهاية منطق التعزيز ==========



        if last >= tp1_price: 
            with EXECUTOR_LOCK:
                self.PENDING_SELLS.add(sym)
                trading_queue.put({
                    'cmd': 'SELL',
                    'user_id': self.user_id,
                    'session_ref': self,            
                    'sym': sym,
                    'qty': t['total_qty'],
                    'entry': entry,
                    'exec_price': last,
                    'level': 1,  # مستوى TP1
                    'is_sl': False,
                    'is_esl': False,
                    'is_timeout': False
                })
                t['closing'] = True

                t['tp1_triggered'] = True

                t['close_start_time'] = time.time()
            add_log(f"🎯 {sym} وصل هدف TP_BASE_PCT ({tp1_price*100:.2f}%)")
            return



# ================= EMERGENCY LIQUIDITY EXIT (محمد & جيميني) =================
        # 1. فحص انخفاض الحجم (Volume Drop)
        current_volume_24h = 0
        if sym in TICKER_DATA:
            current_volume_24h = float(TICKER_DATA[sym].get('quoteVolume', 0))
        
        entry_vol = t.get('entry_volume_24h', 0)
        vol_emergency = False
        
        if entry_vol > 0 and current_volume_24h > 0:
            vol_drop_pct = (entry_vol - current_volume_24h) / entry_vol
            if vol_drop_pct >= 0.10: # انخفاض 10%
                vol_emergency = True
                emergency_reason = f"انخفاض سيولة {vol_drop_pct*100:.1f}%"

        # 2. فحص اتساع السبريد (Spread Explosion)
        spread_emergency = False
        if sym in BOOK_DATA:
            bid_p, _, ask_p, _ = BOOK_DATA[sym]
            if bid_p > 0:
                current_spr = (ask_p - bid_p) / bid_p
                # إذا تجاوز السبريد الحد الأقصى بـ 4 أضعاف (رادار التسييل اللحظي)
                if current_spr > (SPREAD_MAX * 4): 
                    spread_emergency = True
                    emergency_reason = f"اتساع السبريد الحاد {current_spr*100:.3f}%"





# =========================================================================




        # ===== منطق التريلينق الوحيد =====
        # إذا كنا في وضع التداول الحقيقي وفُعل نظام التريلينق
        if USE_HYBRID_TRAILING and LIVE and not self.dry_run:
            # إذا كان الأمر مفعلاً بالفعل على بايننس، لا تفعل شيئاً هنا واترك الخيط يراقبه
            if sym in self.trailing_mgr.active_trailing_orders:
                return
            
            # استدعاء المدير لتفعيل المراقبة أو تنفيذ الإغلاق
            # ملاحظة: لا نستدعي PENDING_SELLS أو trade_executor_thread هنا
            # الاعتماد كلي على Trailing Manager الخاص بهذا المستخدم
            self.trailing_mgr.check_and_update_trailing(sym, last, entry)
        
        else:
            # ===== منطق الإغلاق للمحاكاة (أو عند تعطيل النظام الهجين) =====
            # هذا هو منطق الكود القديم
            if t.get("closing"):
                return




    def _request_sell(self, sym, entry, price, level, is_sl, is_esl):
        """إرسال طلب بيع للمنفذ"""
        if sym in self.PENDING_SELLS: return
        
        self.PENDING_SELLS.add(sym)
        trading_queue.put({
            'cmd': 'SELL',
            'user_id': self.user_id,
            'session_ref': self,
            'sym': sym,
            'qty': self.OPEN[sym]['total_qty'],
            'entry': entry,
            'exec_price': price,
            'level': level,
            'is_sl': is_sl,
            'is_esl': is_esl
        })

    # ==========================================================
    # 📊 إدارة البيانات والتقارير (Finalize Close)
    # ==========================================================
    
    def finalize_close(self, sym, pnl, kind, level=None, is_sl=False, is_esl=False, trade_value=0.0):
        """يتم استدعاؤها بواسطة المنفذ بعد نجاح البيع"""
        # تحديث الإحصائيات الخاصة بالمستخدم
        self.STATS["trades"] += 1
        self.STATS["pnl_usd"] += pnl
        self.STATS["total_trade_volume"] += trade_value



        
        if is_esl:
            self.STATS["wins"] += 1
        elif is_sl:
            self.STATS["sl"] += 1
            self.STATS["losses"] += 1
        else:
            if pnl >= 0:
                self.STATS["wins"] += 1
            else:
                self.STATS["losses"] += 1
            if level is not None and 1 <= level <= TP_LEVELS:
                self.STATS["tp"][level-1] += 1
        
        # تسجيل في اللوج العام (اختياري)
        register_last_trade(sym, kind, pnl)
        
        # تنظيف
        self.LAST_CLOSE[sym] = time.time()
        
        # تنظيف الذاكرة الخاصة (Buffers) كما في الكود القديم
        # ملاحظة: يتم تنظيفها من Global لأنها قد تكون مشتركة، ولكن تنظيفها من self آمن
        global LAST_D_AVG, LAST_IOBI_AVG, D_BUF, IOBI_BUF
        
        # تنظيف القيم العامة كما في النسخة الأصلية (HARD RESET)
        LAST_D_AVG.pop(sym, None)
        LAST_IOBI_AVG.pop(sym, None)
        # ملاحظة: لا نحذف من D_BUF, IOBI_BUF العالمية لأنها قد يستخدمها مستخدمون آخرون
        # ولكن نقوم بتفريغها من نسخة المستخدم الحالية
        self.D_BUF.pop(sym, None)
        self.IOBI_BUF.pop(sym, None)
        
        if sym in self.OPEN: 
            del self.OPEN[sym]
        # if sym not in self.OPEN:  # بعد الحذف
        #     GLOBAL_OPEN_SYMBOLS.discard(sym) 









    def _trigger_enhancement_order(self, sym, current_price, base_size, level_int, extra_pct, fixed_usd=None):
        """
        إرسال أمر تعزيز مباشر للطابور بدون شروط دخول.
        level_int: رقم المستوى (1, 2, 3...) لتسجيله.
        extra_pct: نسبة الزيادة (0.10, 0.20, 0.30...)
        """
        # حساب الحجم الجديد: الأصل + (الأصل * نسبة الزيادة)

        # إذا كان fixed_usd موجود (مثل 200 دولار)، نستعمله بدلاً من الحساب


        if fixed_usd is not None:
            final_order_size = fixed_usd
        else:
            final_order_size = base_size + (base_size * extra_pct)
            final_order_size = round(final_order_size, 2)

        if fixed_usd:
            add_log(f"🚀 ENHANCEMENT TRIGGERED: {sym} | Level: {level_int} | Price: {current_price:.8f} | Fixed ${final_order_size:.2f} USD")
        else:
            add_log(f"🚀 ENHANCEMENT TRIGGERED: {sym} | Level: {level_int} | Price: {current_price:.8f} | Size: ${final_order_size:.2f} (+{extra_pct*100:.0f}%)")



        


        # وضع الأمر في الطابور للتنفيذ الفوري
        trading_queue.put({
            'cmd': 'BUY',
            'user_id': self.user_id,
            'session_ref': self,
            'sym': sym,
            'price': current_price,
            'config': {'order_size': final_order_size}
        })




    def get_profit_to_trade_ratio(self):
        if self.STATS["total_trade_volume"] > 0:
            return (self.STATS["pnl_usd"] / self.STATS["total_trade_volume"]) * 100
        return 0.0



    def get_status_payload(self):
        """توليد بيانات الحالة لمنصة SaaS"""
        return {
            "user_id": self.user_id,
            "session_id": self.session_id,
            "engine_status": self.engine_status,
            "active_trades_count": len(self.OPEN),
            "closed_trades_count": self.STATS["trades"],
            "balance_usdt": self.BALANCE,
            "pnl_usdt": self.STATS["pnl_usd"],
            "profit_to_trade_ratio": self.get_profit_to_trade_ratio(),
            "last_heartbeat": int(time.time())
        }


    def start_user_data_stream(self):
        """بدء WebSocket خاص بهذا المستخدم لمراقبة أوامره فقط (المحسن 100%)"""

        if not self.client or self.dry_run: 
            print(f"⚠️ [{self.user_id}] وضع التجربة مفعل، لا يتم تشغيل Stream حقيقي.")
            return
        
        try:
            self.listen_key = self.client.stream_get_listen_key()
        except Exception as e:
            add_log(f"❌ Failed to get listen key for {self.user_id}: {e}")
            return

        self.stop_keep_alive = Event()   # متغير جديد

        def keep_alive():
            while not self.stop_keep_alive.is_set():
                time.sleep(1800)
                try:
                    self.client.stream_keepalive(listenKey=self.listen_key)

                except:
                    pass


        threading.Thread(target=keep_alive, daemon=True).start()
        def on_user_ws_message(msg):
            """معالجة رسائل بايننس (تنفيذ أمر، رفض، إلخ) - بدون استعلام HTTP"""
            try:
                event = msg.get('e')
                
                # فقط نهتم بأحداث تنفيذ الأوامر
                if event == 'executionReport':
                    sym = msg.get('s')
                    order_type = msg.get('o')    # نوع الأمر: MARKET, LIMIT, STOP_LOSS
                    status = msg.get('X')        # حالة الأمر الحالية: NEW, PARTIALLY_FILLED, FILLED
                    
                    order_id = msg.get('i')
                    
                    # إذا كان الأمر هو STOP_LOSS (التريلينق الخاص بنا) وقد تم تنفيذه (FILLED)
                    if status == 'FILLED' and order_type == 'STOP_LOSS':
                        add_log(f"📢 WS: تم إغلاق تريلينق {sym} للمستخدم {self.user_id}")
                        
                        if sym in self.trailing_mgr.active_trailing_orders:
                            # 1. نجلب السعر والكمية من رسالة الـ WebSocket نفسها لتوفير الوقت
                            # رسالة الـ WebSocket تحتوي على: l (last executed qty), L (last price), z (cumulative qty)
                            # لكننا نحتاج حساب دقيق للـ Fees (العمولات)
                            
                            # 2. نستدعي المدير للقيام بالحسابات النهائية
                            # سنمرر له الرسالة حتى لا يضطر لطلب HTTP
                            entry_price = self.OPEN.get(sym, {}).get('entry', 0)
                            if entry_price > 0:
                                # محاولة حساب من الويب سوكت مباشرة (أسرع)
                                executed_qty = float(msg.get('z', 0))
                                cummulative_quote = float(msg.get('Z', 0)) # Z sometimes not in older streams, fallback to get_order
                                last_price = float(msg.get('L', 0))
                                
                                if executed_qty > 0 and cummulative_quote > 0:
                                    # حساب الربح السريع
                                    pnl = cummulative_quote - (executed_qty * entry_price)
                                    
                                    # خصم العمولة إن وجدت في الرسالة
                                    comm = float(msg.get('n', 0))
                                    if comm > 0:
                                        pnl -= comm
                                    
                                    # إنهاء الصفقة فوراً
                                    t_snapshot = self.OPEN[sym].copy()
                       
                                    self.finalize_close(
                                        sym,
                                        pnl,
                                        "TRAIL_WS",
                                        level=None,
                                        is_sl=False,
                                        is_esl=False
                                    )
                                    
                                    # تنظيف الذاكرة
                                    del self.trailing_mgr.active_trailing_orders[sym]
                                    return

                            # إذا لم نستطع الحساب من الويب سوكت، نستدعي دالة الفحص القديمة لمرة واحدة فقط
                            self.trailing_mgr.check_and_update_trailing(sym, TR.get(sym, [0])[-1], entry_price)

            except Exception as e:
                add_log(f"WS Error User {self.user_id}: {e}")

        try:
            self.user_ws_manager = ThreadedWebsocketManager(
                api_key=self.client.API_KEY, 
                api_secret=self.client.API_SECRET
            )
            self.user_ws_manager.start()
            
            self.listen_key = self.client.stream_get_listen_key()
            self.user_ws_manager.start_user_socket(callback=on_user_ws_message,reconnect=True)
            add_log(f"🔌 User Stream Started for {self.user_id} (Optimized - No Polling)")
            

        except Exception as e:
            add_log(f"❌ Failed User Stream for {self.user_id}: {e}")


    def stop_user_data_stream(self):
        """إغلاق WebSocket وتنظيف الموارد"""
        if hasattr(self, 'stop_keep_alive') and self.stop_keep_alive:
            self.stop_keep_alive.set()

        try:
            if self.user_ws_manager:
                self.user_ws_manager.stop()
                self.user_ws_manager = None
        except:
            pass    





    def validate_api_credentials(self):
        """
        التحقق من صحة مفاتيح API، صلاحية التداول الفوري، والـ IP المسموح به.
        تُرجع (True, None, None) إذا نجحت،
        أو (False, رسالة خطأ, engine_ip) إذا فشلت.
        """
        if not self.client or self.dry_run:
            return False, "Client not initialized or dry run mode", None

        engine_ip = "62.169.17.101"  # يُفضل جعله متغيراً في الكلاس
        try:
            # محاولة جلب معلومات الحساب (تتطلب توقيع)
            account = self.client.get_account()
            # إذا وصلنا هنا، فالمفاتيح صالحة والـ IP مسموح به
            return True, None, None
        except BinanceAPIException as e:
            if e.code == -2015:
                return False, "Binance API key is invalid or IP not whitelisted. Please check your API key and ensure the server IP is whitelisted.", engine_ip
            elif e.code == -1022:
                return False, "Invalid API secret. Please ensure your API secret is correct and has not been changed.", engine_ip
            elif e.code == -2014:
                return False, "API key format is invalid. Please check your API key.", engine_ip
            else:
                return False, f"Binance API error: {e.message}", engine_ip
        except Exception as e:
            return False, f"Unexpected error validating API: {str(e)}", None



ACTIVE_USERS = {} # {session_id: UserEngine_instance}

def add_log(msg):
    """إضافة رسالة للسجل مع طابع زمني"""
    timestamp = time.strftime("%H:%M:%S")
    full_msg = f"[{timestamp}] {msg}"
    print(full_msg) 
    SYSTEM_LOGS.append(full_msg)
    # الاحتفاظ بآخر 50 رسالة فقط لتوفير الذاكرة
    if len(SYSTEM_LOGS) > 50:
        SYSTEM_LOGS.pop(0)



# ====================== DEPTH CALCULATOR THREAD ======================

def depth_calculator_thread():
    print("🔢 Depth Calculator Thread Started (Processing Depth 40 Async)")
    while True:
        try:
            sym = depth_calc_queue.get()
            # الحسابات الثقيلة تحدث هنا بعيداً عن تدفق السرعة
            val = compute_true_iobi_from_depth(sym)
            if val is not None:
                DEPTH_IOBI[sym] = val
        except Exception as e:

            pass
    

# ============================================================
# 2. SAAS COMMAND LISTENER
# ============================================================

class SaasCommandHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        """استقبال الأوامر من منصة SaaS"""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            payload = json.loads(post_data)
            action = payload.get("action")
            response = {"status": "error", "message": "Unknown action"}
            global ACTIVE_USERS # تأكد من استخدام القاموس العام للمستخدمين النشطين

            print(f"📥 استلام أمر: {action}", flush=True) # 1. طباعة الأمر الوارد

          


            if action == "start":
                data = payload.get("payload", {})
                session_id = data.get("session_id")
                user_info = data.get("user", {})
                exch_info = data.get("exchange", {})



                sys_info = data.get("system", {})

                # استخراج المفاتيح وإعدادات الوضع
                api_key = exch_info.get("api_key")
                api_secret = exch_info.get("api_secret")
                dry_run = sys_info.get("dry_run", False)




                validation_error = None
                if not dry_run and api_key and api_secret:
                    try:
                        # إنشاء عميل مؤقت
                        temp_client = Client(api_key, api_secret)

                        # الخطوة 1: التحقق من صحة المفتاح والـ IP
                        temp_client.get_account()
                        print(f"✅ API key validated (account access) for user {user_info.get('user_id')}", flush=True)

                        # الخطوة 2: التحقق من صلاحية التداول الفوري عبر أمر اختباري
                        try:
                            # استخدم رمز شائع مثل BTCUSDT بكمية صغيرة آمنة (لن يتم التنفيذ)
                            temp_client.create_test_order(
                                symbol='BTCUSDT',
                                side='BUY',
                                type='MARKET',
                                quantity=0.001
                            )
                            print(f"✅ Spot trading permission confirmed for user {user_info.get('user_id')}", flush=True)
                        except BinanceAPIException as e:
                            if e.code == -2015:

                                validation_error = f"API key does not have spot trading permissions. Please enable 'Enable Spot & Margin Trading' in your API settings. Your Server IP:  {ENGINE_IP} Please add it to your Binance API"
                            else:
                                validation_error = f"Trading permission check failed: {e.message}"
                            print(f"❌ Trading permission check failed: {validation_error}", flush=True)
                        except Exception as e:
                            validation_error = f"Unexpected error during trading permission check: {str(e)}"
                            print(f"❌ {validation_error}", flush=True)
                    except BinanceAPIException as e:
                        # أخطاء get_account
                        if e.code == -2015:
                            validation_error = f"Binance API key is invalid or IP not whitelisted. Please check your API key and ensure the server IP ({ENGINE_IP}) is whitelisted."
                        elif e.code == -1022:
                            validation_error = "Invalid API secret. Please ensure your API secret is correct and has not been changed."
                        elif e.code == -2014:
                            validation_error = "API key format is invalid. Please check your API key."
                        else:
                            validation_error = f"Binance API error: {e.message}"
                        print(f"❌ API validation failed: {validation_error}", flush=True)
                    except Exception as e:
                        validation_error = f"Unexpected error validating API: {str(e)}"
                        print(f"❌ API validation exception: {validation_error}", flush=True)

                elif not dry_run and (not api_key or not api_secret):
                    validation_error = "API key or secret missing"
                else:
                    print(f"ℹ️ Dry run mode, skipping API validation", flush=True)





                # إذا كان هناك خطأ في التحقق، نرسل الرد ولا ننشئ المحرك
                if validation_error:
                    response = {"status": "error", "message": validation_error}

                elif session_id in ACTIVE_USERS:
                    print(f"❌ الجلسة {session_id} موجودة مسبقاً", flush=True)
                    response = {"status": "error", "message": "Session already exists"}
                else:
                    print(f"🚀 جاري إنشاء محرك جديد للمستخدم...", flush=True)
                    # إنشاء جلسة جديدة
                    new_engine = UserEngine(
                        session_id=session_id,
                        user_id=user_info.get("user_id"),
                        api_key=exch_info.get("api_key"),
                        api_secret=exch_info.get("api_secret"),
                        config_payload=data
                    )





                    new_engine.start_user_data_stream()

                    ACTIVE_USERS[session_id] = new_engine
                    print(f"✅ تم بدء الجلسة {session_id} بنجاح", flush=True) # 4


                    response = {"status": "success", "message": "Session started"}









            # --- 2. STOP COMMAND ---
            elif action == "stop":
                data = payload.get("payload", {})
                session_id = data.get("session_id")
                
                if session_id in ACTIVE_USERS:
                    engine = ACTIVE_USERS[session_id]
                    
                    # إيقاف المحرك
                    engine.engine_status = "stopped"
                    engine.kill_switch = True
                    

                    engine.close_all_positions_immediately()
                    # إغلاق الـ WebSocket
                    engine.stop_user_data_stream()
                    
                    # حذفه من القائمة
                    del ACTIVE_USERS[session_id]
                    
                    add_log(f"🛑 STOPPED Session: {session_id}")
                    response = {"status": "success", "message": "Session stopped"}
                else:
                    response = {"status": "error", "message": "Session not found"}

            # --- 3. UPDATE COMMAND ---
            elif action == "update":
                data = payload.get("payload", {})
                session_id = data.get("session_id")
                
                if session_id in ACTIVE_USERS:
                    engine = ACTIVE_USERS[session_id]
                    
                    # تحديث الإعدادات
                    new_conf = data.get("config", {})
                    if "order_size" in new_conf:
                        engine.order_size = new_conf["order_size"]
                    if "kill_switch" in new_conf:
                        engine.kill_switch = new_conf["kill_switch"]
                        
                    add_log(f"🔧 UPDATED Session: {session_id}")
                    response = {"status": "success", "message": "Config updated"}
            
            # --- 4. HEARTBEAT COMMAND ---
            elif action == "heartbeat":
                data = payload.get("payload", {})
                session_id = data.get("session_id")
                
                if session_id in ACTIVE_USERS:
                    # تحديث وقت آخر ظهور
                    ACTIVE_USERS[session_id].last_seen = time.time()
                    response = {"status": "alive"}

            # إرسال الرد
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            print(f"SaaS Error: {e}", flush=True)
            self.send_response(500)
            self.end_headers()

    def do_GET(self):
        """للحصول على بيانات البث (الصفقات المفتوحة والمغلقة)"""
        if self.path.startswith('/stats'):
            from urllib.parse import urlparse, parse_qs
            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            session_id = query_params.get('session_id', [None])[0]
            
            response = {"status": "error", "message": "Session not found or invalid"}
            
            if session_id and session_id in ACTIVE_USERS:
                engine = ACTIVE_USERS[session_id]
                # 🚀 هنا يتم إرجاع البيانات المطلوبة
                response = {
                    "status": "success",
                    "user_id": engine.user_id,
                    "active_trades_count": len(engine.OPEN),        # عدد الصفقات المفتوحة
                    "closed_trades_count": engine.STATS["trades"],   # عدد الصفقات المغلقة
                    "balance_usdt": engine.BALANCE,
                    "pnl_usdt": engine.STATS["pnl_usd"]
                }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()


    def log_message(self, format, *args):
        pass # إيقاف لوجات الأباتشي المزعجة

def start_command_server():
    """تشغيل سيرفر الأوامر على منفذ منفصل (مثلاً 2021)"""
    server = socketserver.ThreadingTCPServer(("0.0.0.0", 2020), SaasCommandHandler)
    print("🚀 Command Server Listening on port 2021...")
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

def heartbeat_monitor_thread():
    """خيط يعمل في الخلفية لفصل المستخدمين الذين انقطع اتصالهم (Heartbeat)"""
    global ACTIVE_USERS
    while True:
        time.sleep(10) # فحص كل 10 ثواني
        now = time.time()
        dead_sessions = []
        
        for sid, engine in ACTIVE_USERS.items():
            # إذا مرت دقيقة (60 ثانية) دون تجديد للقلب
            if now - engine.last_seen > 60:
                dead_sessions.append(sid)
        
        for sid in dead_sessions:
            add_log(f"⚠️ HEARTBEAT LOST: Stopping {sid}")
            try:
                engine = ACTIVE_USERS[sid]
                engine.stop_user_data_stream()
                engine.kill_switch = True
                del ACTIVE_USERS[sid]
            except:
                pass


# ====================== INSTANT PRELOAD SYSTEM ======================

def instant_preload_system(symbols_list):
  """تحميل فوري لكل الرموز قبل بدء التشغيل - NO WAITING"""
  print(f"\n{'='*60}", flush=True)
  print("🚀 نظام التحميل المسبق الفوري - INSTANT PRELOAD SYSTEM")
  print(f"📊 جاري تحميل {len(symbols_list)} رمز...", flush=True)
  print('='*60, flush=True)

  start_time = time.time()
  loaded_count = 0

  for sym in symbols_list:
      try:
          # جلب بيانات الكندل (1 دقيقة)
          resp = requests.get(
              f"{BINANCE}/api/v3/klines",
              params={
                  "symbol": sym,
                  "interval": "1m",
                  "limit": 80  # 80 شمعة
              },
              timeout=8
          )

          if resp.status_code != 200:
              # بيانات افتراضية للمساعدة
              TR[sym] = [1.0] * 100
              print(f"   ⚠️  {sym}: استخدام بيانات افتراضية", flush=True)
              continue

          klines = resp.json()
          if not klines or len(klines) < 20:
              TR[sym] = [1.0] * 100
              print(f"   ⚠️  {sym}: بيانات غير كافية، استخدام افتراضية", flush=True)
              continue

          # استخراج الأسعار (4 تيكات لكل شمعة)
          prices = []
          for k in klines[-50:]:  # آخر 50 شمعة
              open_price = float(k[1])
              high_price = float(k[2])
              low_price = float(k[3])
              close_price = float(k[4])

              # إضافة 4 تيكات متنوعة
              prices.extend([open_price, high_price, low_price, close_price])

          # حفظ مع الحد الأقصى 400 تيك
          TR[sym] = prices[-400:] if len(prices) > 400 else prices

          # تهيئة Buffers
          IOBI_BUF[sym] = [IOBI_TH + 0.01] * IOBI_WINDOW
          D_BUF[sym] = [ENTRY_TH + 0.01] * D_WINDOW

          # تعيين المتوسطات الأولية
          LAST_D_AVG[sym] = ENTRY_TH + 0.01
          LAST_IOBI_AVG[sym] = IOBI_TH + 0.01

          loaded_count += 1
          print(f"   ✅ {sym}: {len(TR[sym])} تيك جاهز", flush=True)

      except Exception as e:
          print(f"   ❌ {sym}: خطأ - {str(e)[:50]}", flush=True)
          TR[sym] = [1.0] * 100  # بيانات افتراضية

  elapsed = time.time() - start_time
  print(f"\n📊 التحميل اكتمل: {loaded_count}/{len(symbols_list)} رمز", flush=True)
  print(f"⏱️  الوقت: {elapsed:.1f} ثانية", flush=True)
  print('='*60, flush=True)

  return loaded_count > 0

# =================== HTTP HELPERS ============================

def _jget(path, params=None, timeout=8):
 try:
     r = requests.get(BINANCE + path, params=params or {}, timeout=timeout)
     return r.json()
 except Exception:
     return None

def _safe_float(x, default=0.0):
 try:
     return float(x)
 except Exception:
     return default

def _spread_ratio(bid, ask):
 if bid <= 0 or ask <= 0:
     return 1e9
 mid = (bid + ask) / 2.0
 if mid <= 0:
     return 1e9
 return (ask - bid) / mid

# ============================================================
# ================ GOLDEN FIST - 3D BOTTOM DETECTION =========
# ============================================================

def detect_golden_fist_bottom(sym, price_history):
 if len(price_history) < 50:
     return False, 0.0, {}

 import numpy as np
 from scipy import stats

 prices = np.array(price_history[-50:])
 hist, bins = np.histogram(prices, bins=15, density=True)
 hist = hist + 1e-10
 entropy = -np.sum(hist * np.log(hist))
 entropy_norm = min(entropy / np.log(len(hist)), 1.0)

 bin_centers = (bins[:-1] + bins[1:]) / 2
 density_deriv = np.gradient(hist)
 critical_points = []
 for i in range(1, len(density_deriv)):
     if density_deriv[i-1] < 0 and density_deriv[i] > 0:
         critical_points.append(bin_centers[i])

 returns = np.diff(prices) / prices[:-1]
 volatility = np.std(returns) if len(returns) > 0 else 0

 volatility_score = 0.0
 if 0.001 <= volatility <= 0.012:
     volatility_score = 1.0 - abs(volatility - 0.006) / 0.006

 short_trend = np.polyfit(range(10), prices[-10:], 1)[0] if len(prices) >= 10 else 0
 medium_trend = np.polyfit(range(30), prices[-30:], 1)[0] if len(prices) >= 30 else 0

 trend_alignment = 0.0
 if medium_trend >= 0 and short_trend >= -abs(medium_trend)*0.3:
     trend_alignment = 1.0
 elif medium_trend < 0 and short_trend > medium_trend * 1.5:
     trend_alignment = 0.7

 shape_score = 0.5
 if len(prices) >= 20:
     recent = prices[-20:]
     early = prices[-20:-10]
     late = prices[-10:]

     early_slope = np.polyfit(range(10), early, 1)[0] if len(early) >= 2 else 0
     late_slope = np.polyfit(range(10), late, 1)[0] if len(late) >= 2 else 0

     if early_slope < 0 and late_slope > early_slope * -0.5:
         shape_score = 1.0
     elif early_slope < 0 and late_slope > early_slope * -0.3:
         shape_score = 0.7
     else:
         shape_score = 0.3

 weights = {'entropy': 0.25, 'volatility': 0.25, 'trend': 0.30, 'shape': 0.20}
 entropy_score = 1.0 - abs(entropy_norm - 0.5)

 confidence = (
     weights['entropy'] * entropy_score +
     weights['volatility'] * volatility_score +
     weights['trend'] * trend_alignment +
     weights['shape'] * shape_score
 )

 # تخفيف كبير في شروط القاع الذهبي
 is_bottom = (
     (len(critical_points) > 0 or confidence > 0.3) and  # تخفيف كبير
     volatility_score > 0.3 and  # تخفيف كبير: من 0.6 إلى 0.3
     trend_alignment > 0.2 and   # تخفيف كبير: من 0.5 إلى 0.2
     confidence >= GF_MIN_CONFIDENCE
 )

 details = {
     'entropy': entropy_norm,
     'volatility': volatility,
     'volatility_score': volatility_score,
     'short_trend': short_trend,
     'medium_trend': medium_trend,
     'trend_alignment': trend_alignment,
     'shape_score': shape_score,
     'critical_points': critical_points,
     'confidence': confidence,
 }

 return is_bottom, confidence, details

def detect_iron_resistance(sym, price_history, current_price):
 if len(price_history) < 30:
     return False, 0.0, False


 prices = np.array(price_history[-30:])
 price_points = prices.reshape(-1, 1)

 kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
 clusters = kmeans.fit_predict(price_points)

 cluster_centers = kmeans.cluster_centers_.flatten()
 resistance_idx = np.argmax(cluster_centers)
 resistance_price = cluster_centers[resistance_idx]

 resistance_hits = np.sum(clusters == resistance_idx)
 resistance_strength = resistance_hits / len(prices)

 breakout_confirmed = False
 if current_price > resistance_price * 1.001:
     recent_prices = prices[-5:] if len(prices) >= 5 else prices
     recent_trend = np.polyfit(range(len(recent_prices)), recent_prices, 1)[0]

     recent_returns = np.diff(recent_prices) / recent_prices[:-1]
     recent_vol = np.std(recent_returns) if len(recent_returns) > 0 else 0

     if (recent_trend > 0 and
         recent_vol > 0.0002 and  # تخفيف كبير: من 0.0005 إلى 0.0002
         current_price > resistance_price * (1 + IR_BREAKOUT_PCT)):
         breakout_confirmed = True

 has_resistance = resistance_strength > IR_MIN_STRENGTH

 return has_resistance, resistance_price, breakout_confirmed

DEPTH_WS_MANAGER = None
DEPTH_WS_DATA = {}
DEPTH_WS_LOCK = threading.Lock()
ACTIVE_DEPTH_SYMBOLS = set()  # الرموز النشطة حالياً

def handle_depth(msg):
    """معالجة تحديثات WebSocket للعمق (عام للجميع)"""
    if not isinstance(msg, dict):
        return

    sym = msg.get("s")
    if not sym:
        return


# تحضير البيانات خارج القفل لتسريع العملية
    data = {
        "bids": msg.get("b", []),
        "asks": msg.get("a", []),
        "timestamp": time.time()
    }



    with DEPTH_WS_LOCK:
        DEPTH_WS_DATA[sym] = data
    # إرسال للحساب (غير متزامن)


    # إرسال للحساب (غير متزامن)
    try:
        depth_calc_queue.put_nowait(sym)
    except:
        pass

def start_depth_ws_manager(symbols):
    """بدء مدير WebSocket للعمق (مرة واحدة فقط)"""
    global DEPTH_WS_MANAGER
    
    if DEPTH_WS_MANAGER is not None:
        return DEPTH_WS_MANAGER
    
    try:
        # ❌ NO API KEYS NEEDED - Depth is public data!
        DEPTH_WS_MANAGER = ThreadedWebsocketManager()
        DEPTH_WS_MANAGER.start()
        add_log("🌐 Depth WebSocket Manager Started (Public)")
        return DEPTH_WS_MANAGER
    except Exception as e:
        add_log(f"❌ Failed to start Depth WebSocket: {e}")
        return None

def update_depth_subscriptions(symbols_to_watch):
    """تحديث الاشتراكات للرموز النشطة فقط"""
    global ACTIVE_DEPTH_SYMBOLS, DEPTH_WS_MANAGER
    
    if DEPTH_WS_MANAGER is None:
        DEPTH_WS_MANAGER = start_depth_ws_manager()
        if DEPTH_WS_MANAGER is None:
            return
    
    symbols_to_watch = set(symbols_to_watch)
    
    # الرموز التي يجب إضافتها

  

    # الرموز التي يجب إزالتها
    to_remove = ACTIVE_DEPTH_SYMBOLS - symbols_to_watch
   
    for sym in list(to_remove):
        try:
            



# هذا السطر هو "السحر" الذي سيمنح نظامك التنفس
            conn_key = f"{sym.lower()}@depth"
            if hasattr(DEPTH_WS_MANAGER, '_sockets') and conn_key in DEPTH_WS_MANAGER._sockets:
            #if conn_key in DEPTH_WS_MANAGER._sockets:
                DEPTH_WS_MANAGER.stop_socket(conn_key)
#            ACTIVE_DEPTH_SYMBOLS.remove(sym)

            ACTIVE_DEPTH_SYMBOLS.discard(sym)
            time.sleep(0.1)


        #except: pass   

        except Exception:
            pass # تجاهل أي فشل في الحذف وواصل العمل


    # الرموز التي يجب إضافتها
    to_add = symbols_to_watch - ACTIVE_DEPTH_SYMBOLS
    
    # إضافة رموز جديدة
    for sym in to_add:
        try:
            DEPTH_WS_MANAGER.start_depth_socket(
                symbol=sym.lower(),
                callback=handle_depth
            )
            time.sleep(0.5)  # تأخير بسيط لتجنب الضغط
            ACTIVE_DEPTH_SYMBOLS.add(sym)
        except Exception as e:
            add_log(f"⚠️ Failed to subscribe to depth for {sym}: {e}")
    

    # ملاحظة: في مكتبة binance-python، لا يمكن إيقاف اتصال محدد بسهولة
    # لذلك نحتفظ بجميع الاشتراكات لمنع التعقيد
    # لكن يمكننا تنظيف البيانات القديمة
    cleanup_old_depth_data(to_remove)

def cleanup_old_depth_data(removed_symbols):
    """تنظيف بيانات العمق للرموز غير النشطة"""
    with DEPTH_WS_LOCK:
        for sym in removed_symbols:
            DEPTH_WS_DATA.pop(sym, None)







def compute_true_iobi_from_depth(sym):
    """احسب IOBI من بيانات العمق المخزنة في WebSocket"""
    # استرجاع البيانات من WebSocket
    with DEPTH_WS_LOCK:
        if sym not in DEPTH_WS_DATA:
            return None

        bids = DEPTH_WS_DATA[sym].get("bids", [])
        asks = DEPTH_WS_DATA[sym].get("asks", [])

    if not bids or not asks:
        return None

    # تحديث أفضل سعر (OB)
    try:
        bid_p = float(bids[0][0]); bid_q = float(bids[0][1])
        ask_p = float(asks[0][0]); ask_q = float(asks[0][1])
        OB[sym] = (bid_p, bid_q, ask_p, ask_q)
    except Exception:
        pass

    # حساب IOBI كما هو
    buy = 0.0
    sell = 0.0


    # استخدام المتغيرات المحلية لتسريع الوصول (Local Variable Optimization)
    _depth_limit = DEPTH_LIMIT
    _decay = DEPTH_DECAY


    if DEPTH_WEIGHT_MODE == "qty":
        # حساب بناءً على الكمية
        for i in range(_depth_limit):
            if i >= len(bids) or i >= len(asks): break
            weight = 1.0 if i <= 0 else (_decay ** i)
            buy += float(bids[i][1]) * weight
            sell += float(asks[i][1]) * weight

        
    else:
        # حساب بناءً على القيمة (الحالة الافتراضية)
        for i in range(_depth_limit):
            if i >= len(bids) or i >= len(asks): break
            weight = 1.0 if i <= 0 else (_decay ** i)
            # فصل التحويل لتحسين الأداء
            b_p = float(bids[i][0]); b_q = float(bids[i][1])
            a_p = float(asks[i][0]); a_q = float(asks[i][1])
            
            buy += (b_p * b_q) * weight
            sell += (a_p * a_q) * weight




    # ======== تحديث سجل حجم البيع ========
    BUY_VOL_HISTORY[sym].append(buy)
    SELL_VOL_HISTORY[sym].append(sell)
    TOTAL_VOL_HISTORY[sym].append(buy + sell)
    # =====================================


    tot = buy + sell
    if tot <= 0:
        return None
    return (buy - sell) / tot










# ====================== INDICATORS ============================

def momentum(sym):
 arr = TR.get(sym, [])
 if len(arr) <= MOM_TICKS:
     return 0.0
 prev = arr[-MOM_TICKS-1] if len(arr) > MOM_TICKS else arr[-MOM_TICKS]
 if prev == 0:
     return 0.0
 last = arr[-1]
 return (last - prev) / prev

def obp(sym):
 if sym not in OB:
     return 0.0
 bid_p, bid_q, ask_p, ask_q = OB[sym]
 buy  = bid_p * bid_q
 sell = ask_p * ask_q
 tot  = buy + sell
 return (buy - sell) / tot if tot > 0 else 0.0

def iobi(sym):
 if sym in DEPTH_IOBI:
     return DEPTH_IOBI[sym]
 return obp(sym)

def compute_D(sym):
 m = momentum(sym)
 o = iobi(sym)
 s = 0.6*m + 0.4*o
 return 0.33*m + 0.34*o + 0.33*s






def estimate_market_regime(price_history):
    """
    تحليل نظام السوق: هل هو متذبذب (Ranging) أم اتجاهي (Trending)؟
    تعيد (is_ranging, details) حيث is_ranging=True يعني مسموح للتداول.
    """
    if len(price_history) < REGIME_WINDOW + 1:
        return False, {}  # بيانات غير كافية

    # 1. حساب الميل (Slope) لآخر REGIME_WINDOW تكة باستخدام الانحدار الخطي البسيط
    y = np.array(price_history[-REGIME_WINDOW:])
    x = np.arange(REGIME_WINDOW)
    slope, _ = np.polyfit(x, y, 1)  # slope لكل تكة
    avg_price = np.mean(y)

    # 2. حساب ATR يدوي (True Range) لآخر REGIME_WINDOW تكة
    true_ranges = []
    for i in range(len(price_history) - REGIME_WINDOW, len(price_history)):
        if i == 0:
            continue
        high = max(price_history[i-1], price_history[i])  # تقريبي: لا يوجد بيانات OHLC مفصلة، نستخدم السعرين
        low = min(price_history[i-1], price_history[i])
        close_prev = price_history[i-1]
        tr = max(high - low, abs(high - close_prev), abs(low - close_prev))
        true_ranges.append(tr)
    atr = np.mean(true_ranges) if true_ranges else 0.0

    if avg_price == 0:
        return False, {}

    atr_ratio = atr / avg_price  # نسبة التقلب إلى السعر
    slope_ratio = abs(slope) / avg_price  # ميل نسبي

    # شروط السوق المتذبذب المناسب للاستراتيجية
    is_ranging = (
        slope_ratio < REGIME_MAX_SLOPE and
        REGIME_MIN_ATR_RATIO <= atr_ratio <= REGIME_MAX_ATR_RATIO
    )

    details = {
        'slope': slope,
        'atr': atr,
        'avg_price': avg_price,
        'atr_ratio': atr_ratio,
        'slope_ratio': slope_ratio,
    }
    return is_ranging, details


def get_daily_high(sym):
    """
    جلب أعلى سعر في آخر 24 ساعة للرمز sym من Binance.
    تستخدم كاش لتجنب الطلبات المتكررة.
    """
    now = time.time()
    if sym in DAILY_HIGH_CACHE and now - DAILY_HIGH_CACHE[sym][1] < DAILY_HIGH_CACHE_TTL:
        return DAILY_HIGH_CACHE[sym][0]
    
    try:
        url = f"{BINANCE}/api/v3/ticker/24hr?symbol={sym}"
        resp = requests.get(url, timeout=3)
        if resp.status_code == 200:
            data = resp.json()
            high = float(data.get('highPrice', 0))
            DAILY_HIGH_CACHE[sym] = (high, now)
            return high
    except Exception as e:
        add_log(f"⚠️ Daily high error {sym}: {e}")
    
    return None




def get_atr(sym):
    now = time.time()
    if sym in ATR_CACHE and now - ATR_CACHE[sym][1] < ATR_CACHE_TTL:
        return ATR_CACHE[sym][0]
    try:
        # جلب (ATR_PERIOD+1) شمعة يومية لحساب ATR
        url = f"{BINANCE}/api/v3/klines?symbol={sym}&interval=1d&limit={ATR_PERIOD+1}"
        resp = requests.get(url, timeout=5)
        if resp.status_code == 200:
            klines = resp.json()
            if len(klines) >= ATR_PERIOD:
                true_ranges = []
                for i in range(1, len(klines)):
                    high = float(klines[i][2])
                    low = float(klines[i][3])
                    prev_close = float(klines[i-1][4])
                    tr = max(high - low, abs(high - prev_close), abs(low - prev_close))
                    true_ranges.append(tr)
                atr = sum(true_ranges) / len(true_ranges)
                ATR_CACHE[sym] = (atr, now)
                return atr
    except Exception as e:
        add_log(f"⚠️ ATR error {sym}: {e}")
    return None



def pulse(sym):
 arr = TR.get(sym, [])
 if len(arr) <= MOM_TICKS:
     return 0.0
 base = arr[-MOM_TICKS]
 last = arr[-1]
 if base == 0:
     return 0.0
 return abs((last - base) / base)

def inst_vol(sym):
 return abs(momentum(sym))

# -------- HOT LIST (رادار فقط) ----------


# =================== SYMBOL FILTERS =========================
def _build_exchange_map():
    """جلب معلومات السوق بدون الاعتماد على عميل معين"""
    global _EXINFO_MAP
    
    if _EXINFO_MAP is not None:
        return _EXINFO_MAP
    
    try:

        resp = requests.get(
            "https://api.binance.com/api/v3/exchangeInfo",
            timeout=10
        )
        
        if resp.status_code != 200:
            print("⚠️ Failed to get exchange info", flush=True)
            return {}
        
        info = resp.json()
        mp = {}
        for s in info.get("symbols", []):
            mp[s.get("symbol", "")] = s
        
        _EXINFO_MAP = mp
        return mp
        
    except Exception as e:
        print(f"❌ Error building exchange map: {e}", flush=True)
        return {}

def ensure_symbol_filters(symbols):
    """تحميل الفلترات لرموز معينة (مشترك لجميع المستخدمين)"""
    if not symbols:
        return
    
    exmap = _build_exchange_map()
    if not exmap:
        return
    
    # قفل لمنع التحميل المتزامن لنفس الرمز
    with threading.Lock():
        for sym in symbols:
            if sym in SYMBOL_FILTERS:
                continue
            
            s = exmap.get(sym)
            if not s:
                continue
            
            min_notional = 0.0
            min_qty = 0.0
            step_size = 0.0
            price_filter = 0.0
            
            for f in s.get("filters", []):
                filter_type = f.get("filterType", "")
                
                if filter_type == "MIN_NOTIONAL":
                    min_notional = float(f.get("minNotional", 0.0))
                
                elif filter_type == "LOT_SIZE":
                    min_qty = float(f.get("minQty", 0.0))
                    step_size = float(f.get("stepSize", 0.0))
                
                elif filter_type == "PRICE_FILTER":
                    price_filter = float(f.get("tickSize", 0.0))
            
            SYMBOL_FILTERS[sym] = {
                "min_notional": min_notional,
                "min_qty": min_qty,
                "step_size": step_size,
                "tick_size": price_filter,
                "symbol": sym,
                "base_asset": s.get("baseAsset", ""),
                "quote_asset": s.get("quoteAsset", "")
            }
    


# =================== SAFE BUY/SELL =========================



def _floor_to_step(qty, step):
    if step <= 0 or qty <= 0: return float(qty)
    try:
        d_qty = Decimal(str(qty))
        d_step = Decimal(str(step))
        remainder = d_qty % d_step
        return float(d_qty - remainder)
    except:
        return float(qty)


def _price_usdt(asset):
 try:
     r = requests.get(
         BINANCE + "/api/v3/ticker/price",
         params={"symbol": f"{asset}USDT"},
         timeout=4
     ).json()
     return float(r.get("price", 0.0))
 except Exception:
     return 0.0

def _base_asset(sym):
 return sym[:-4] if sym.endswith("USDT") else sym

def preload_history(sym, limit=720):
 d = _jget("/api/v3/klines", params={
     "symbol": sym,
     "interval": "1m",
     "limit": limit
 }, timeout=8)

 if not isinstance(d, list) or len(d) < 10:
     return

 prices = [float(k[4]) for k in d if float(k[4]) > 0]
 if prices:
     TR[sym] = prices[-400:]

# =================== OPEN/CLOSE LOGIC =========================

def peak_bottom_context(sym):
    arr = TR.get(sym, [])
    if len(arr) < 10:
        return None

    win = arr[-RANGE_TICKS:] if len(arr) > RANGE_TICKS else arr[:]
    hi = max(win)
    lo = min(win)
    last = win[-1]

    if lo <= 0 or last <= 0:
        return None

    rng = hi - lo
    if (rng / last) < MIN_RANGE_PCT:
        return None

    pos = (last - lo) / rng
    return {"hi": hi, "lo": lo, "pos": pos}


def confirm_bottom_candles(sym):
    arr = TR.get(sym, [])
    if len(arr) < CANDLE_CONFIRM_N + 1:
        return False

    for i in range(CANDLE_CONFIRM_N):
        if arr[-1 - i] < arr[-2 - i]:
            return False
    return True


def confirm_breakout_candles(sym, resistance_price):
    arr = TR.get(sym, [])
    if len(arr) < CANDLE_CONFIRM_N:
        return False

    for i in range(CANDLE_CONFIRM_N):
        if arr[-1 - i] <= resistance_price:
            return False
    return True




def register_last_trade(sym, kind, pnl):
 global LAST_TRADES
 LAST_TRADES.append({"sym": sym, "kind": kind, "pnl": pnl})
 if len(LAST_TRADES) > 33:
     LAST_TRADES = LAST_TRADES[-33:]


# =================== SMART TOP_MAX (ALL USDT) ====================


def load_symbols_smart_topmax_all_usdt():
    global _LAST_SMART_SYMS, _LAST_SMART_TS, _LAST_SMART_ERR, _ELITE_CACHE , TICKER_DATA, BOOK_DATA

    now = time.time()
    if _LAST_SMART_SYMS and (now - _LAST_SMART_TS) < SYM_REFRESH_SEC:
        return _LAST_SMART_SYMS[:]
    if _LAST_SMART_ERR and (now - _LAST_SMART_ERR) < SMART_REFRESH_BACKOFF_SEC:
        return _LAST_SMART_SYMS[:]

    # ========== جلب بيانات 24 ساعة و BookTicker ==========
    tick24 = _jget("/api/v3/ticker/24hr", timeout=15)

    if isinstance(tick24, list):
        for item in tick24:
            sym = item.get("symbol")
            TICKER_DATA[sym] = item  # نخزن الكائن كامل (السعر، الحجم، التغير)

    book   = _jget("/api/v3/ticker/bookTicker", timeout=15)
    ex_info = _jget("/api/v3/exchangeInfo", timeout=20)



    if not isinstance(tick24, list) or not isinstance(book, list):
        _LAST_SMART_ERR = now
        return _LAST_SMART_SYMS[:]



    # ========== 2. تحديث فلتر النخبة (التعديل الجوهري هنا) ==========
    if ex_info and isinstance(ex_info, dict) and 'symbols' in ex_info:
        current_elite = set()
        # قائمة العلامات التي تدل على مخاطرة عالية
        danger_tags = {'monitoring', 'seed', 'innovation', 'assessment', 'next_generation_assessment'}

        for s in ex_info.get('symbols', []):
            sym_name = s.get('symbol', '')
            status = s.get('status', '').upper()
            # تحويل الأوسمة لنصوص صغيرة للفحص
            tags = [str(t).lower() for t in s.get('tags', [])]


            permissions = s.get('permissions', [])
            perm_sets = s.get('permissionSets', []) # جلب الحاوية الجديدة للصلاحيات


            # شرط النخبة: يجب أن تكون قابلة للتداول الفوري (SPOT)

            is_spot = ('SPOT' in permissions) or any('SPOT' in sub_set for sub_set in perm_sets)

            if status == 'TRADING' and is_spot:


                # القاعدة: إذا لم تحتوي العملة على أي من "أوسمة الخطر"، فهي نخبة
                if not any(t in danger_tags for t in tags):

                    current_elite.add(sym_name)

        if current_elite:
            _ELITE_CACHE = current_elite

# ✅ هذا يحمي البوت من الانهيار ويمنع استبدال الفلتر بالقائمة الكاملة
    usable_elite = _ELITE_CACHE if _ELITE_CACHE else set()




    # ========== بناء قاموس الـ Book للوصول السريع ==========
    bm = {}
    for x in book:
        sym = x.get("symbol", "")
        if not sym:
            continue
        bm[sym] = (
            _safe_float(x.get("bidPrice", 0.0)),
            _safe_float(x.get("bidQty", 0.0)),
            _safe_float(x.get("askPrice", 0.0)),
            _safe_float(x.get("askQty", 0.0)),
        )

    BOOK_DATA = bm    

    now_ts_book = time.time()
    for sym in bm.keys():
        BOOK_DATA_TIMESTAMPS[sym] = now_ts_book




    # ========== المرحلة الأولى: الفلاتر السريعة ==========
    preliminary = []
    now_ts = time.time()
    for x in tick24:
        sym = x.get("symbol", "")

# 🛡️ 1. فحص نظام الحظر (Blacklist Check)
        if sym in VOL_DROP_BLACKLIST:
            if now_ts < VOL_DROP_BLACKLIST[sym]:
                # العملة لا تزال تحت الحظر، تخطاها فوراً
                continue
            else:
                # انتهت مدة الحظر، احذفها من القائمة
                del VOL_DROP_BLACKLIST[sym]


        EXCLUDE_LIST = [
            # --- عملات مستقرة (Stablecoins) ---
            "USDC", "BUSD", "TUSD", "PAX", "DAI", "FDUSD", "USDP", 
            "USDS", "USDE", "AEUR", "USTC", "USD1", "UUSDT", "VAI", 
            "PYUSD", "USDD", "ZUSD", "EURC", "USDCX", "SUSD", "GUSD",
            
            # --- عملات ورقية (Fiat) ---
            "EUR", "GBP", "TRY", "AUD", "BRL", "ZAR", "RUB", "UAH", 
            "NGN", "PLN", "RON", "ARS", "COP", "MXN", "IDR", "THB", 
            "VND", "KZT", "EGP", "SAR", "AED",
            
            # --- رموز الرافعة المالية (Leveraged Tokens) ---
            "UPUSDT", "DOWNUSDT", "BULLUSDT", "BEARUSDT", 
            "LONG", "SHORT",
            
            # --- أزواج مستقرة محددة تظهر أحياناً ---
            "USDTUSDC", "USDCUSDT", "FDUSDUSDT", "TUSDUSDT", "BUSDT",
            "USDTTRY", "USDTBRL", "USDTEUR", "USDTGBP"
        ]

        # فحص ذكي: استبعاد إذا كانت العملة تحتوي على أي من الكلمات المحظورة

     
        if any(fx in sym for fx in EXCLUDE_LIST):
            continue

        if not sym.endswith("USDT"):
            continue

        if sym not in bm:
            continue


        if not sym.endswith("USDT"):
            continue

        qv   = _safe_float(x.get("quoteVolume", 0.0))
        cnt  = int(_safe_float(x.get("count", 0.0), 0.0))
        if cnt <= 0 or (qv / cnt) < MIN_AVG_TRADE_USDT:
            continue
        lastp = _safe_float(x.get("lastPrice", 0.0))
        if lastp <= 0:
            continue





        if lastp <= 1.0:
            continue




        if sym not in bm:
            continue

        bid, bidq, ask, askq = bm[sym]
        spr = _spread_ratio(bid, ask)
        top_book_usdt = ((bid * bidq) + (ask * askq)) / 2.0


        if top_book_usdt < TOPBOOK_MIN_USDT:
            continue
        if qv < QV_MIN_USDT:
            continue
        if cnt < COUNT_MIN_24H:
            continue



        if sym not in usable_elite:
            continue



        # نحتفظ بكل البيانات اللازمة للمرحلة الثانية
        preliminary.append((sym, qv, cnt, top_book_usdt, spr, lastp))

    # ========== المرحلة الثانية: جلب التذبذب اللحظي ==========
    candidates = []
    for sym, qv, cnt, top_book_usdt, spr, lastp in preliminary:
        # جلب شمعة واحدة حسب الفترة المحددة (1m, 5m, ...)
        kline = _jget(f"/api/v3/klines?symbol={sym}&interval={INTRADAY_INTERVAL}&limit=2", timeout=5)
        if not kline or len(kline) == 0:
            continue

        # kline[0] = [open, high, low, close, volume, ...]
        high = float(kline[0][2])   # أعلى سعر خلال الشمعة
        low  = float(kline[0][3])   # أدنى سعر خلال الشمعة

        if low <= 0:
            continue

        intraday_range = (high - low) / low   # التذبذب اللحظي (نسبة مئوية)


##new
        if not (VOLATILITY_INTRADAY_MIN <= intraday_range <= VOLATILITY_INTRADAY_MAX):
            continue

        minute_volume_usdt = float(kline[0][7])

###new
        # ===== فلتر التذبذب: حد أدنى وحد أقصى =====
#        if intraday_range < VOLATILITY_INTRADAY_MIN or intraday_range > VOLATILITY_INTRADAY_MAX:
 #           continue
        # ==========================================

        # ===== حساب السكور مع إضافة التذبذب =====
        liq_score   = math.log(1.0 + qv)
        act_score   = math.log(1.0 + cnt)
        depth_score = math.log(1.0 + top_book_usdt)
        spr_pen     = spr * SMART_SCORE_PENALTY
        vol_score   = math.log(1.0 + intraday_range * 1000)   # تضخيم للقيمة الصغيرة

###new
        velocity_score = math.log(1.0 + minute_volume_usdt)


        score = (SMART_SCORE_ALPHA * liq_score) + \
                (SMART_SCORE_BETA * act_score) + \
                (SMART_SCORE_GAMMA * depth_score) - spr_pen + \
                (VOLATILITY_WEIGHT * vol_score) + \
                (1.5 * velocity_score)


        # =========================================

        candidates.append((score, sym))

    # ========== ترتيب وأخذ أفضل TOP_BACK ==========
    candidates.sort(reverse=True)
    out = [sym for _, sym in candidates[:TOP_BACK]]

    # ========== إضافة العملات المفتوحة حالياً ==========
    for s in OPEN.keys():
        if s not in out:
            out.append(s)

    _LAST_SMART_SYMS = out[:]
    _LAST_SMART_TS   = now
    return out


def load_symbols():
 return load_symbols_smart_topmax_all_usdt()



def ws_thread(symbols):
    import time
    from queue import Queue, Empty
    from threading import Thread, Event

    global DISPLAY_SYMS, ws_thread_twm

    # === إعدادات محلية قابلة للتعديل ===
    MAX_MULTIPLEX = 1024            # حد الباينانس (تحكم حسب الحاجة)
    RESTART_MIN_INTERVAL = 5.0      # ثواني لا تعيد تشغيل التWM بشكل متكرر
    RESTART_MAX_BACKOFF = 60.0      # أقصى تأخير عند الفشل
    TICK_QUEUE_MAXSIZE = 10000
    BATCH_PROCESS_MS = 50          

    # === إنشاء twm وqueue وflags ===
    twm = ThreadedWebsocketManager()
    ws_thread_twm = twm
    try:
        twm.start()
    except Exception as e:
        print(f"❌ Failed to start TWM: {e}", flush=True)
        # سنحاول إعادة التشغيل لاحقاً داخل الحلقة
    print("🟢 WebSocket Manager started.", flush=True)

    tick_queue = Queue(maxsize=TICK_QUEUE_MAXSIZE)
    multiplex_socket_id = None
    current_symbol_set = set(map(str.lower, set(symbols)))
    last_twm_restart = 0.0
    stop_event = Event()









    def handle_multiplex_msg(msg):
        """
        معالجة رسالة التيك مباشرة: تحديث TR ثم تمريرها لجميع المستخدمين.
        """
        try:
            # استخراج البيانات
            if isinstance(msg, dict) and "data" in msg:
                data = msg["data"]
            elif isinstance(msg, dict) and "s" in msg and "c" in msg:
                data = msg
            else:
                if isinstance(msg, list):
                    for item in msg:
                        handle_multiplex_msg(item)
                return

            if not isinstance(data, dict):
                return
            if "s" not in data or "c" not in data:
                return

            sym = data["s"]
            last = float(data["c"])

            # تحديث السوق المشترك مع القفل
            with MARKET_DATA_LOCK:
                TR.setdefault(sym, []).append(last)
                if len(TR[sym]) > 400:
                    TR[sym] = TR[sym][-400:]



        except Exception as e:
            add_log(f"❗ handle_multiplex_msg error: {e}")    




    def start_multiplex_subscription(symbol_list):
        nonlocal multiplex_socket_id, twm, last_twm_restart

        # تنظيف وتقييد العدد
        symbol_list = list(dict.fromkeys([s.lower() for s in symbol_list]))


        if len(symbol_list) > MAX_MULTIPLEX:
            open_syms = set()
            for session in ACTIVE_USERS.values():
                open_syms.update([x.lower() for x in session.OPEN.keys()])
            prioritized = list(open_syms) + [s for s in symbol_list if s not in open_syms]
            symbol_list = prioritized[:MAX_MULTIPLEX]

        # تجنب إعادة تشغيل متكررة
        now = time.time()
        if now - last_twm_restart < RESTART_MIN_INTERVAL and multiplex_socket_id is not None:
            return True

        # تأكد أن twm شغّال


        try:
            if not hasattr(twm, "is_alive") or not twm.is_alive():
                try:
                    with twm_ops_lock:
                        try:
                            twm.stop()
                        except Exception:
                            pass
                        twm = ThreadedWebsocketManager()
                        twm.start()
                        ws_thread_twm = twm
                        last_twm_restart = time.time()
                except Exception as e:
                    add_log(f"⚠️ TWM restart error: {e}")
        except Exception:
            pass






        try:
            if multiplex_socket_id:
                # استخدام الدالة الآمنة
                safe_stop_socket(twm, multiplex_socket_id)
                multiplex_socket_id = None
                time.sleep(0.12)

            # بدء اشتراك جديد بطريقة آمنة
            new_sock = safe_start_multiplex(twm, symbol_list, handle_multiplex_msg)
            if not new_sock:
                add_log("❌ start_multiplex_socket returned falsy id")
                return False

            multiplex_socket_id = new_sock
            last_twm_restart = time.time()
            return True
        except Exception as e:
            add_log(f"❌ Multiplex subscription failed: {e}")
            return False







    # === عامل معالجة التيكات (يعمل في ثريد منفصل) ===
    def tick_worker():
        """يقرأ من الطابور ويعالج الدفعات على جلسات المستخدمين."""
        BATCH_SLEEP = BATCH_PROCESS_MS / 1000.0
        while not stop_event.is_set():
            try:
                batch = []
                # نحاول أخذ أول عنصر بانتظار قصير
                item = tick_queue.get(timeout=1.0)
                batch.append(item)
                # ثم نجمع بقية العناصر المتاحة حتى زمن قصير
                t_end = time.time() + BATCH_SLEEP
                while time.time() < t_end:
                    try:
                        item = tick_queue.get_nowait()
                        batch.append(item)
                    except Empty:
                        break

                # نحول الباتش إلى dict صغير لأحدث قيمة لكل رمز (لتقليل العمل)
                latest_per_sym = {}
                for sym, last in batch:
                    latest_per_sym[sym] = last

                # snapshot للجلسات لتجنب مشاكل concurrency
                sessions = list(ACTIVE_USERS.values())
                for sym, last in latest_per_sym.items():
                    # تحديث TR تم سابقًا في handler، لكن لو أردت تحديث هنا أيضاً احرص على القفل
                    for session in sessions:
                        try:
                            if session.kill_switch or session.engine_status != "running":
                                continue

                            session.last_seen = time.time()
        
                            session.process_tick(sym)
                        except Exception as e:
                            add_log(f"❗ UserEngine.process_tick error for {getattr(session,'user_id', 'unknown')}: {e}")

            except Empty:
                continue
            except Exception as e:
                add_log(f"❗ tick_worker exception: {e}")
                time.sleep(0.1)

    # === بدء عامل التيكات ===
    worker_thread = Thread(target=tick_worker, daemon=True)
    worker_thread.start()

    # === تشغيل أولي للاشتراك ===
    start_multiplex_subscription(current_symbol_set)

    # === حلقة التحديث الرئيسية مع watchdog و backoff عند الفشل ===
    last_refresh = time.time()
    backoff = 1.0
    while True:
        now = time.time()
        # تحقق من حيوية TWM
        try:
            if not hasattr(twm, "is_alive") or not twm.is_alive():
                add_log("⚠️ TWM not alive — attempting restart")
                try:
                    twm.stop()
                except Exception:
                    pass
                try:
                    twm = ThreadedWebsocketManager()
                    twm.start()
                    ws_thread_twm = twm
                except Exception as e:
                    add_log(f"❗ Failed to restart TWM: {e}")
                    time.sleep(min(backoff, RESTART_MAX_BACKOFF))
                    backoff = min(backoff * 2, RESTART_MAX_BACKOFF)
                    continue
                # بعد إعادة التشغيل، نعيد الاشتراك
                start_multiplex_subscription(current_symbol_set)
                backoff = 1.0
        except Exception:
            pass

        if now - last_refresh >= SYM_REFRESH_SEC:
            last_refresh = now
            try:
                base_syms = load_symbols()
                all_open_symbols = set()
                for session in ACTIVE_USERS.values():
                    all_open_symbols.update(session.OPEN.keys())


                merged_syms_upper = sorted(set(base_syms) | all_open_symbols)

                # 2. إعداد القائمة الصغيرة للشبكة (WebSocket)
                # الشبكة تحتاج صغيرة في هذا الكود
                merged_syms_lower = [s.lower() for s in merged_syms_upper]


                new_set = set(merged_syms_lower)



                diff = current_symbol_set.symmetric_difference(new_set)
                # نسمح بتجاهل تغيرات صغيرة (مثلاً أقل من 3) لتقليل churn
                if diff and len(diff) >= 1:
                    # لو كبير جداً نقسم إلى مجموعات (غير مضمونية هنا) — لكن سنحاول إعادة الاشتراك مرة واحدة
                    current_symbol_set = new_set
                    ok = start_multiplex_subscription(current_symbol_set)
                    if not ok:
                        # تعطل: جرب backoff
                        time.sleep(min(backoff, RESTART_MAX_BACKOFF))
                        backoff = min(backoff * 2, RESTART_MAX_BACKOFF)
                    else:
                        backoff = 1.0

                symbols[:] = merged_syms_upper
                if LIVE:
                    ensure_symbol_filters(merged_syms_upper)

                for session in ACTIVE_USERS.values():
                    try:
                        session.refresh_top_n(merged_syms_upper)
                    except Exception as e:
                        add_log(f"❗ refresh_top_n error for {getattr(session,'user_id','unknown')}: {e}")

                # تحديث DISPLAY_SYMS
                disp = base_syms[:TOP_MAX]
                for s in all_open_symbols:
                    if s not in disp:
                        disp.append(s)
                DISPLAY_SYMS = disp[:]

            except Exception as e:
                add_log(f"❗ ws_thread refresh error: {e}")

        time.sleep(0.2)


# ====================== TRADE EXECUTOR THREAD (MULTI-USER FIXED) ======================


def get_target_pct_by_entries(entries_count):
    if entries_count == 2:
        return 0.0040   # 0.40%
    elif entries_count == 3:
        return 0.0035   # 0.35%
    elif entries_count >= 4:
        return 0.0030   # 0.30%
    else:
        return 0.0050   # 0.50% للصفقة الأولى


def trade_executor_thread():
    """
    إصدار معدل للعمل مع نظام متعدد المستخدمين (Fixed Logic)
    """
    while True:
        try:
            task = trading_queue.get()
            cmd = task.get('cmd')
            sym = task.get('sym')
            session_ref = task.get('session_ref')
            
            if not session_ref:
                print(f"⚠️ Task without session_ref: {task}", flush=True)
                continue
                
            user_id = getattr(session_ref, 'user_id', 'UNKNOWN')
            
            # ==================== COMMON CHECKS ====================
            if cmd not in ['BUY', 'SELL']:
                continue
            if not sym:
                continue
                
            # ==================== BUY LOGIC ====================
            if cmd == 'BUY':
                try:
                    price = task.get('price', 0.0)
                    user_config = task.get('config', {})
                    order_size = user_config.get('order_size', SPEND)


                    print(f"💰 [{session_ref.user_id}] قبل شراء {sym}: BALANCE={session_ref.BALANCE}, order_size={session_ref.order_size}")

                    session_ref.update_balance_from_exchange(force=True)
                    if session_ref.BALANCE < order_size and not session_ref.dry_run:

                        add_log(f"❌ [{session_ref.user_id}] رصيد غير كافٍ لـ {sym}: لديك {session_ref.BALANCE} USDT وتحتاج {session_ref.order_size}")

                        add_log(f"❌ {user_id}: Insufficient balance for {sym}")
                        session_ref.PENDING_BUYS.discard(sym)
                        continue
                    
                    # --- التنفيذ الحقيقي ---
                    if LIVE and not session_ref.dry_run and session_ref.client:
                        ensure_symbol_filters([sym])
                        
                        try:
                            order = session_ref.client.create_order(
                                symbol=sym,
                                side="BUY",
                                type="MARKET",
                                quoteOrderQty=str(order_size)
                            )
                            
                            # حساب السعر المرجح الصحيح (كما في النسخة القديمة)
                            fills = order.get("fills", [])
                            if fills:
                                total_qty_fill = 0.0
                                total_cost = 0.0
                                for fill in fills:
                                    fill_qty = float(fill["qty"])
                                    fill_price = float(fill["price"])
                                    total_qty_fill += fill_qty
                                    total_cost += fill_qty * fill_price
                                
                                actual_entry_price = total_cost / total_qty_fill if total_qty_fill > 0 else float(fills[0]["price"])
                                bought_qty = total_qty_fill        


                                # تحديث TR فوراً بالسعر الحقيقي للتنفيذ
                                with MARKET_DATA_LOCK:
                                    TR.setdefault(sym, []).append(actual_entry_price)
                                    # حافظ على حجم التاريخ (400 تيك)
                                    if len(TR[sym]) > 400:
                                        TR[sym] = TR[sym][-400:]                                                        

                                # تحديث الرصيد
                                session_ref.BALANCE -= order_size
                                
                                # --- عملية الدمج أو إنشاء صفقة جديدة (Core Logic) ---
                                with EXECUTOR_LOCK:
                                    if sym in session_ref.OPEN:
                                        # 1. دمج مع صفقة موجودة (DCA)
                                        old_trade = session_ref.OPEN[sym]
                                        
                                        # حساب المتوسط الجديد
                                        old_qty = old_trade['total_qty']
                                        old_avg = old_trade['avg_entry']
                                        
                                        new_total_qty = old_qty + bought_qty
                                        new_avg_entry = (old_avg * old_qty + actual_entry_price * bought_qty) / new_total_qty
                                        
                                        # تحديث بيانات الصفقة
                                        old_trade['total_qty'] = new_total_qty
                                        old_trade['avg_entry'] = new_avg_entry
                                        old_trade['entries_count'] = old_trade.get('entries_count', 1) + 1
                                        old_trade['last_entry_time'] = time.time()
                                        old_trade['enhancement_drop_closed'] = False
                                        old_trade['last_enhancement_price'] = None





                                        entries = old_trade['entries_count']
                                        if entries == 2:
                                            old_trade['target_pct'] = 0.0040
                                        elif entries == 3:
                                            old_trade['target_pct'] = 0.0035
                                        elif entries >= 4:
                                            old_trade['target_pct'] = 0.0030
                                        else:
                                            old_trade['target_pct'] = 0.0050





                                        
                                        # إعادة حساب جميع الأهداف بناءً على المتوسط الجديد
                                        for i, pct in enumerate(TP_PCTS, start=1):
                                            old_trade[f"tp{i}"] = new_avg_entry * (1 + pct)
                                        old_trade["sl"] = new_avg_entry * (1 - SL_PCT)
                                        
                                        add_log(f"🔄 {user_id} {sym}: DCA Added - New Qty: {new_total_qty:.4f}, New Avg: {new_avg_entry:.6f}")
                                        
                                    else:
                                        # 2. صفقة جديدة
                                        tps = {f"tp{i}": actual_entry_price * (1 + pct) for i, pct in enumerate(TP_PCTS, start=1)}
                                        new_trade = {
                                            "avg_entry": actual_entry_price,
                                            "total_qty": bought_qty,
                                            "sl": actual_entry_price * (1 - SL_PCT),
                                            "open_time": time.time(),
                                            "max_price": actual_entry_price,


                                            "first_entry_price": actual_entry_price, # لحفظ سعر الدخول الأول لحساب النسبة بدقة
                                            "base_order_size": order_size,          # حفظ الحجم الأصلي المستلم من SaaS
                                            "enhanced_levels": [],                  # لتسجيل المستويات التي تم تعزيزها بالفعل (لمنع التكرار)
                                            "last_enhancement_price": None,         # آخر سعر تم التعزيز عنده
                                            "enhancement_drop_closed": False,       # منع تكرار إغلاق التعزيز



                                            "prev": actual_entry_price,
                                            "tp_touched": False,




                                            "target_pct": 0.0050,







                                            "tp_level": None,
                                            "highest_tp_reached": 0,
                                            "close_pending": None,
                                            "close_tries": 0,
                                            "closing": False,
                                            "highest_price": actual_entry_price,
                                            # حقول إضافية
                                            "entries_count": 1,
                                            "last_entry_time": time.time(),
                                            **tps
                                        }
                                        session_ref.OPEN[sym] = new_trade
                                        add_log(f"✅ {user_id}: Bought {sym} @ {actual_entry_price:.6f}, Qty: {bought_qty:.6f}")

                        except BinanceAPIException as e:
                            add_log(f"❌ {user_id}: Binance API Error buying {sym}: {e}")
                    
                    # --- المحاكاة ---
                    elif session_ref.dry_run or not LIVE:
                        qty = order_size / price if price > 0 else 0
                        
                        with EXECUTOR_LOCK:
                            if sym in session_ref.OPEN:
                                # محاكاة الدمج
                                old_trade = session_ref.OPEN[sym]
                                old_qty = old_trade['total_qty']
                                old_avg = old_trade['avg_entry']
                                
                                new_total_qty = old_qty + qty
                                new_avg_entry = (old_avg * old_qty + price * qty) / new_total_qty
                                
                                old_trade['total_qty'] = new_total_qty
                                old_trade['avg_entry'] = new_avg_entry
                                old_trade['entries_count'] = old_trade.get('entries_count', 1) + 1
                                old_trade['last_entry_time'] = time.time()
                                
                                for i, pct in enumerate(TP_PCTS, start=1):
                                    old_trade[f"tp{i}"] = new_avg_entry * (1 + pct)
                                old_trade["sl"] = new_avg_entry * (1 - SL_PCT)
                                
                                add_log(f"🔄 [SIM] {user_id} {sym}: DCA Added - New Qty: {new_total_qty:.4f}, New Avg: {new_avg_entry:.6f}")
                                
                            else:
                                tps = {f"tp{i}": price * (1 + pct) for i, pct in enumerate(TP_PCTS, start=1)}
                                new_trade = {
                                    "avg_entry": price,
                                    "total_qty": qty,
                                    "sl": price * (1 - SL_PCT),
                                    "open_time": time.time(),
                                    "max_price": price,
                                    "prev": price,
                                    "tp_touched": False,
                                    "tp_level": None,
                                    "highest_tp_reached": 0,
                                    "close_pending": None,
                                    "close_tries": 0,
                                    "closing": False,
                                    "highest_price": price,
                                    "entries_count": 1,
                                    "last_entry_time": time.time(),
                                    **tps
                                }
                                session_ref.OPEN[sym] = new_trade
                                add_log(f"✅ [SIM] {user_id}: Bought {sym} @ {price:.6f}, Qty: {qty:.6f}")
                        
                except Exception as e:
                    logging.error(f"[BUY ERROR] User {user_id}, {sym}: {e}")
                    add_log(f"❌ {user_id}: Buy error for {sym}: {str(e)[:50]}")
                
                finally:
                    session_ref.PENDING_BUYS.discard(sym)
            
            
            # ==================== SELL LOGIC (FIXED) ====================
            elif cmd == 'SELL':
                try:
                    level = task.get('level')
                    is_sl = task.get('is_sl', False)
                    is_esl = task.get('is_esl', False)
                    
                    with EXECUTOR_LOCK:
                        if sym not in session_ref.OPEN:
                            add_log(f"⚠️ {user_id}: No open trade for {sym}")
                            session_ref.PENDING_SELLS.discard(sym)
                            continue
                        t = session_ref.OPEN[sym]
                        entry = t.get('avg_entry', 0)
                        qty = t.get('total_qty', 0)
                        t_snapshot = t.copy()
                    
                    # --- التنفيذ الحقيقي ---
                    if LIVE and not session_ref.dry_run and session_ref.client:
                        ensure_symbol_filters([sym])
                        f = SYMBOL_FILTERS.get(sym, {})
                        
                        if f:



                            base_asset = sym.replace("USDT", "") 
                            
                    
                            balance_info = session_ref.client.get_asset_balance(asset=base_asset)
                            real_free = float(balance_info.get('free', 0.0))
    


                            if real_free <= 0:
                                raise Exception("small posision i dont sell   ")
                                
                            step_size = f.get('step_size', 0.00000001)
                            min_qty = f.get('min_qty', 0)
                            
                        
                            

                            target_qty = real_free if real_free < qty else qty
                            qty_adj = _floor_to_step(target_qty * 0.999, step_size)



                            # ======= شرط الأمان: التحقق من وصول السعر لـ TP1 =======
                            last_price = task.get('exec_price', None)
                            if last_price is None:
                                last_price = TR.get(sym, [entry])[-1]




                            tp1_price = entry * (1 + TP_PCTS[0]) 
                            if last_price < tp1_price and not is_sl and not is_esl:
                                add_log(f"⚠️ {user_id} {sym} Price {last_price:.6f} < TP1 {tp1_price:.6f}. Sell delayed.")
                                session_ref.PENDING_SELLS.discard(sym)
                                continue
                            # =======================================================


                            tp1_price = entry * (1 + TP_PCTS[0]) 
                            # إغلاق إجباري لأمر TP1 (level == 1) حتى لو السعر أقل قليلاً
                            if last_price < tp1_price and not is_sl and not is_esl and level != 1:
                                add_log(f"⚠️ {user_id} {sym} Price {last_price:.6f} < TP1 {tp1_price:.6f}. Sell delayed.")
                                session_ref.PENDING_SELLS.discard(sym)
                                continue

                            # =======================================================


                            if qty_adj <= 0 or (min_qty > 0 and qty_adj < min_qty):
                                pnl = _force_sell_small_qty(session_ref, sym, entry)
                                add_log(f"⚠️ {user_id}: Qty too small, handled logic.")
                            else:
                                try:


                                    last_price = task.get('exec_price', None)
                                    if last_price is None:
                                        # الرجوع إلى آخر سعر متاح في TR أو متوسط الدخول
                                        last_price = TR.get(sym, [entry])[-1]
                                    
                                    tp1_price = entry * (1 + TP_PCTS[0])  # TP1 كنسبة مئوية
                                    # if last_price < tp1_price and not is_sl and not is_esl:
                                    #     add_log(f"⚠️ {user_id} {sym} price {last_price:.6f} small  undeer TP1 {tp1_price:.6f}. tageeel  seeel.")
                                    #     session_ref.PENDING_SELLS.discard(sym)
                                    #     continue   

                                    # التعديل هنا: أضفنا شرط استثناء لهروب السيولة لكي يمر الأمر فوراً
                                    if last_price < tp1_price and not is_sl and not is_esl and level != 'EMERGENCY_VOL_DROP':
                                        add_log(f"⚠️ {user_id} {sym} Price {last_price:.6f} < TP1 {tp1_price:.6f}. Sell delayed.")
                                        session_ref.PENDING_SELLS.discard(sym)
                                        continue

                                    # إغلاق إجباري لأمر TP1 (level == 1) حتى لو السعر أقل قليلاً
                                    if last_price < tp1_price and not is_sl and not is_esl and level != 1 and level != 'EMERGENCY_VOL_DROP':
                                        add_log(f"⚠️ {user_id} {sym} Price {last_price:.6f} < TP1 {tp1_price:.6f}. Sell delayed.")
                                        session_ref.PENDING_SELLS.discard(sym)
                                        continue


                                    # =======================================================

                                    order = session_ref.client.create_order(
                                        symbol=sym,
                                        side="SELL",
                                        type="MARKET",
                                        quantity=format(qty_adj, '.8f').rstrip('0').rstrip('.')
                                    )
                                    
                                    # حساب الربح
                                    fills = order.get("fills", [])
                                    received = sum(float(f.get("price", 0)) * float(f.get("qty", 0)) 
                                                  for f in fills)
                                    
                                    if received > 0:
                                        # حساب الربح بناء على الكمية التي تم بيعها فعلياً والسعر المسجل
                                        # (يمكن استخدام received - (qty_adj * entry) إذا أردت الدقة بناء على التنفيذ)
                                        pnl = received - (qty_adj * entry) 
                                        session_ref.BALANCE += received
                                        
                                        kind = "ESL" if is_esl else ("SL" if is_sl else f"TP{level}")
                                        trade_value = entry * qty
                                        session_ref.finalize_close(sym, pnl, kind, level, is_sl, is_esl, trade_value=trade_value)
                                        
                                        add_log(f"✅ {user_id}: Sold {sym} @ {received/qty_adj:.6f}, PnL: {pnl:.4f}")
                                    else:
                                        add_log(f"⚠️ {user_id}: Sell order filled with zero value")
                                        
                                except BinanceAPIException as e:
                                    add_log(f"❌ {user_id}: Binance API Error selling {sym}: {e}")
                                    raise
                    
                    # --- المحاكاة ---
                    else:
                        current_price = TR.get(sym, [entry])[-1] if TR.get(sym) else entry
                        
                        # تطبيق شرط الأمان في المحاكاة أيضاً
                        tp1_price = entry * (1 + target_pct)
                        if current_price < tp1_price and not is_sl and not is_esl:
                            add_log(f"⚠️ [SIM] {user_id} {sym} Price below TP1, delaying sell.")
                            session_ref.PENDING_SELLS.discard(sym)
                            continue

                        pnl = (current_price - entry) * qty
                        session_ref.BALANCE += (current_price * qty)
                        
                        kind = "ESL" if is_esl else ("SL" if is_sl else f"TP{level}")
                        session_ref.finalize_close(sym, pnl, kind, level, is_sl, is_esl)
                        
                        add_log(f"🔶 [SIM] {user_id}: Sold {sym} @ {current_price:.6f}, PnL: {pnl:.4f}")
                    
                except Exception as e:
                    logging.error(f"[SELL ERROR] User {user_id}, {sym}: {e}")
                    add_log(f"❌ {user_id}: Sell error for {sym}: {str(e)[:50]}")
                    
                    with EXECUTOR_LOCK:
                        if sym in session_ref.OPEN:
                            session_ref.OPEN[sym]['closing'] = False
                
                finally:
                    session_ref.PENDING_SELLS.discard(sym)
        
        except Exception as e:
            logging.error(f"Executor Loop Error: {e}")
            time.sleep(1)

# ==================== HELPER FUNCTION ====================

def _force_sell_small_qty(session_ref, sym, entry_price):
    """بيع إجباري للكميات الصغيرة (Dust)"""
    try:
        base_asset = sym.replace('USDT', '')
        
        # جلب الرصيد الفعلي
        balance = session_ref.client.get_asset_balance(asset=base_asset)
        free_amount = float(balance.get('free', 0))
        
        if free_amount <= 0:
            return 0
        
        f = SYMBOL_FILTERS.get(sym, {})
        step_size = f.get('step_size', 0.00000001)
        
        qty_adj = _floor_to_step(free_amount, step_size)
        
        if qty_adj > 0:
            order = session_ref.client.create_order(
                symbol=sym,
                side="SELL",
                type="MARKET",
                quantity=format(qty_adj, '.8f').rstrip('0').rstrip('.')
            )
            
            fills = order.get("fills", [])
            received = sum(float(f.get("price", 0)) * float(f.get("qty", 0)) for f in fills)
            
            session_ref.BALANCE += received
            return received - (qty_adj * entry_price)
    
    except Exception as e:
        add_log(f"⚠️ Force sell failed for {sym}: {e}")
    
    return 0


def update_best_worst():
    """تحديث قوائم أفضل وأسوأ العملات بناءً على iobi، مع شرط 30%"""
    global BEST_SYMBOLS, WORST_SYMBOLS
    symbols = list(TR.keys())
    if not symbols:
        BEST_SYMBOLS = []
        WORST_SYMBOLS = []
        return

    scores = []
    for sym in symbols:
        score = iobi(sym)
        scores.append((sym, score))

    # ترتيب تنازلي (من الأعلى للأقل)
    scores.sort(key=lambda x: x[1], reverse=True)

    # أفضل 5 عملات بشرط score > 0.30
    best = []
    for sym, score in scores:
        if score > 0.30:
            best.append({"symbol": sym, "score": score})
            if len(best) >= 5:
                break
    BEST_SYMBOLS = best

    # أسوأ 5 عملات بشرط score < -0.30
    worst = []
    for sym, score in reversed(scores):  # نبدأ من الأسوأ (الأقل)
        if score < -0.30:
            worst.append({"symbol": sym, "score": score})
            if len(worst) >= 5:
                break
    WORST_SYMBOLS = worst


def best_worst_updater():
    """خيط لتحديث القوائم كل ثانية"""
    while True:
        try:
            update_best_worst()
        except Exception as e:
            add_log(f"⚠️ خطأ في تحديث القوائم: {e}")
        time.sleep(5)  # تحديث كل ثانية


async def ws_broadcast_handler(websocket):
    """معالج اتصال WebSocket - يرسل التحديثات باستمرار"""
    try:
        while True:
            data = {
                "best": BEST_SYMBOLS,
                "worst": WORST_SYMBOLS
            }
            await websocket.send(json.dumps(data))
            await asyncio.sleep(5)
    except websockets.exceptions.ConnectionClosed:
        pass
    except Exception as e:
        add_log(f"⚠️ WebSocket error: {e}")

async def run_ws_server():
    """تشغيل خادم WebSocket إلى الأبد"""
    async with websockets.serve(ws_broadcast_handler, "0.0.0.0", 2021):
        add_log(f"📡 WebSocket broadcasting on port 2022")
        await asyncio.Future()  # انتظر للأبد

def start_ws_broadcast_server():
    """بدء خادم WebSocket في thread منفصل"""
    asyncio.run(run_ws_server())















# ============================================================
# 📊 ENDPOINT: جلب كل الجلسات والصفقات
# ============================================================

class SessionsHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        """GET /sessions — يرجع كل الجلسات أو جلسة محددة"""
        try:
            from urllib.parse import urlparse, parse_qs

            parsed_url = urlparse(self.path)
            query_params = parse_qs(parsed_url.query)
            requested_session = query_params.get('session_id', [None])[0]

            # ===== إذا تم تمرير session_id نرجع جلسة واحدة فقط =====
            if requested_session:
                if requested_session not in ACTIVE_USERS:
                    self._json_response(404, {"status": "error", "message": "Session not found"})
                    return

                engine = ACTIVE_USERS[requested_session]
                response = {
                    "status": "success",
                    "session": self._build_session_data(requested_session, engine)
                }

            # ===== بدون session_id نرجع الكل =====
            else:
                response = {
                    "status": "success",
                    "total_sessions": len(ACTIVE_USERS),
                    "sessions": []
                }
                for sid, eng in ACTIVE_USERS.items():
                    response["sessions"].append(self._build_session_data(sid, eng))

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode())

        except Exception as e:
            self._json_response(500, {"status": "error", "message": str(e)})

    def do_POST(self):
        """POST /sessions — إغلاق صفقة يدوياً إجبارياً"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            payload = json.loads(post_data)

            session_id = payload.get("session_id")
            symbol = payload.get("symbol")

            if not session_id or not symbol:
                self._json_response(400, {"status": "error", "message": "Missing session_id or symbol"})
                return

            if session_id not in ACTIVE_USERS:
                self._json_response(404, {"status": "error", "message": "Session not found"})
                return

            engine = ACTIVE_USERS[session_id]

            if symbol not in engine.OPEN:
                self._json_response(404, {"status": "error", "message": f"No open trade for {symbol}"})
                return

            if symbol in engine.PENDING_SELLS:
                self._json_response(409, {"status": "error", "message": "Sell already pending"})
                return

            t = engine.OPEN[symbol]

            with EXECUTOR_LOCK:
                engine.PENDING_SELLS.add(symbol)
                trading_queue.put({
                    'cmd': 'SELL',
                    'user_id': engine.user_id,
                    'session_ref': engine,
                    'sym': symbol,
                    'qty': t.get('total_qty', 0),
                    'entry': t.get('avg_entry', 0),
                    'exec_price': 0,
                    'level': 'FORCE_CLOSE',
                    'is_sl': False,
                    'is_esl': True,
                    'is_force_stop': True
                })

            add_log(f"🔒 FORCE CLOSE: {symbol} for user {engine.user_id}")
            self._json_response(200, {"status": "success", "message": f"Force close initiated for {symbol}"})

        except json.JSONDecodeError:
            self._json_response(400, {"status": "error", "message": "Invalid JSON"})
        except Exception as e:
            self._json_response(500, {"status": "error", "message": str(e)})

    def _build_session_data(self, session_id, engine):
        """بناء بيانات جلسة واحدة (دالة مساعدة)"""
        session_data = {
            "session_id": session_id,
            "user_id": engine.user_id,
            "engine_status": engine.engine_status,
            "balance_usdt": round(engine.BALANCE, 2),
            "open_trades_count": len(engine.OPEN),
            "closed_trades_count": engine.STATS["trades"],
            "total_pnl_usdt": round(engine.STATS["pnl_usd"], 4),
            "profit_to_trade_ratio": round(engine.get_profit_to_trade_ratio(), 2),
            "wins": engine.STATS["wins"],
            "losses": engine.STATS["losses"],
            "open_trades": []
        }

        for sym, trade in engine.OPEN.items():
            entry_price = trade.get("avg_entry", 0)
            qty = trade.get("total_qty", 0)
            open_time = trade.get("open_time", time.time())

            # مدة الدخول
            duration_seconds = time.time() - open_time
            if duration_seconds < 60:
                duration_str = f"{int(duration_seconds)} ثانية"
            elif duration_seconds < 3600:
                duration_str = f"{int(duration_seconds // 60)} دقيقة"
            else:
                hours = int(duration_seconds // 3600)
                minutes = int((duration_seconds % 3600) // 60)
                duration_str = f"{hours} ساعة {minutes} دقيقة"

            # السعر الحالي
            current_price = 0
            with MARKET_DATA_LOCK:
                if sym in TR and TR[sym]:
                    current_price = TR[sym][-1]
                elif sym in OB:
                    bid, _, ask, _ = OB[sym]
                    current_price = (bid + ask) / 2
                else:
                    current_price = entry_price

            # ربح / خسارة
            if entry_price > 0 and current_price > 0:
                pnl_pct = ((current_price - entry_price) / entry_price) * 100
                pnl_usd = (current_price - entry_price) * qty
            else:
                pnl_pct = 0
                pnl_usd = 0

            session_data["open_trades"].append({
                "symbol": sym,
                "entry_price": round(entry_price, 8),
                "current_price": round(current_price, 8),
                "quantity": round(qty, 8),
                "duration": duration_str,
                "duration_seconds": int(duration_seconds),
                "pnl_percent": round(pnl_pct, 4),
                "pnl_usd": round(pnl_usd, 4),
                "is_profit": pnl_usd >= 0
            })

        return session_data

    def _json_response(self, code, data):
        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode())

    def log_message(self, format, *args):
        pass


def start_sessions_server():
    """تشغيل سيرفر الجلسات على منفذ 2023"""
    server = socketserver.ThreadingTCPServer(("0.0.0.0", 2022), SessionsHandler)
    print("📊 Sessions Server Listening on port 2023...")
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()






def main():
    global DISPLAY_SYMS, DEPTH_WS_MANAGER
    
    print("\n" + "="*60)
    print("🚀 بدء تشغيل SAIF BOT - نظام متعدد المستخدمين (Multi-Tenant)")
    print("="*60)
    
    # ==================== 1. تحميل الرموز العامة ====================
    symbols = load_symbols()

# ✨ أضف السطر هنا فوراً بعد تحميل الرموز ✨
    if 'BTCUSDT' not in symbols:
        symbols.append('BTCUSDT')
        print("🧭 تم حقن BTCUSDT في نظام الرادار لضمان أمان السوق")



    
    if not symbols:
        print("❌ لم يتم تحميل أي رموز. تحقق من اتصال الإنترنت.")
        return
    
    print(f"📊 تم تحميل {len(symbols)} رمز للعرض")
    
    # ==================== 2. التحميل المسبق للبيانات ====================
    print("\n⚡ جاري التحميل المسبق للبيانات السوقية...")
    preload_success = instant_preload_system(symbols)
    
    if not preload_success:
        print("⚠️  التحذير: بعض الرموز لم يتم تحميلها بشكل كامل")
        print("ℹ️  النظام سيستخدم البيانات الحية مع الوقت")
    
    # ==================== 3. تهيئة عرض الرموز ====================
    DISPLAY_SYMS = symbols[:TOP_MAX]
    
    # ==================== 4. تحميل فلاتر الرموز (بيانات عامة) ====================
    print("🔧 جاري تحميل فلاتر الرموز من البورصة...")
    ensure_symbol_filters(symbols)
    print(f"✅ تم تحميل فلاتر {len(SYMBOL_FILTERS)} رمز")
    
    # ==================== 5. بدء الخيوط الأساسية ====================
    
    # 5.1 خيط تنفيذ الصفقات (لجميع المستخدمين)
    executor_t = threading.Thread(target=trade_executor_thread, daemon=True)
    executor_t.start()
    print("✅ خيط تنفيذ الصفقات بدأ")
    
    # 5.2 خيط حساب العمق (مشترك لجميع المستخدمين)
    calc_depth_t = threading.Thread(target=depth_calculator_thread, daemon=True)
    calc_depth_t.start()
    print("✅ خيط حساب العمق بدأ")
    
    # 5.3 خيط تحديث الأسعار (مشترك لجميع المستخدمين)
    t = threading.Thread(target=ws_thread, args=(symbols,), daemon=True)
    t.start()
    print("✅ خيط تحديث الأسعار بدأ")




    depth_mgr = start_depth_ws_manager(symbols)
    if depth_mgr:
        # بدلاً من الفور لووب اليدوية، استخدم الدالة الذكية من البداية
        update_depth_subscriptions(symbols)
        last_symbols_list = symbols
    # ==================== 6. بدء خدمات النظام ====================
    
    # 6.1 سيرفر الأوامر (لإدارة المستخدمين)
    start_command_server()
    print("✅ سيرفر الأوامر يعمل على المنفذ 2021")
    
    # 6.3 مراقبة نبضات المستخدمين
    hb_monitor = threading.Thread(target=heartbeat_monitor_thread, daemon=True)
    hb_monitor.start()
    print("✅ نظام مراقبة النبضات بدأ")
    
    print("✅ النظام يعمل بكامل طاقته.")


    # خيط تحديث القوائم
    updater_thread = threading.Thread(target=best_worst_updater, daemon=True)
    updater_thread.start()



    start_sessions_server()    


    # خادم WebSocket للبث
    ws_broadcast_thread = threading.Thread(target=start_ws_broadcast_server, daemon=True)
    ws_broadcast_thread.start()

    add_log("📡 WebSocket broadcasting on port 2022")
    # ============================================================
    # ✨ الحل الجوهري: حلقة إبقاء البرنامج حياً
    # ============================================================






    last_symbols_list = []
    try:
        while True:


            now = datetime.datetime.now()
            # الثواني والأجزاء التي مرت من الدقيقة الحالية
            passed_seconds = now.second + now.microsecond / 1_000_000.0
            # الوقت المتبقي للوصول للثانية 00 في الدقيقة التالية
            wait_time = 60.0 - passed_seconds

            # 2. الانتظار "الإجباري"
            if wait_time > 0:
                time.sleep(wait_time)

            # 3. التنفيذ الفوري (رأس الدقيقة 00)
            current_tick = datetime.datetime.now().strftime("%H:%M:%S")

            try:
                new_symbols = load_symbols()
                if new_symbols != last_symbols_list:
                    DISPLAY_SYMS = new_symbols[:TOP_MAX]
                    update_depth_subscriptions(new_symbols)
                    last_symbols_list = new_symbols

            except Exception as e:
                print(f"⚠️ خطأ أثناء التحديث الدوري: {e}")

            time.sleep(1.1)    

    except KeyboardInterrupt:
        print("\n🛑 تم إيقاف البوت يدوياً.")
        # هنا يمكن إضافة كود تنظيف في المستقبل




if __name__ == "__main__":
    main()

















