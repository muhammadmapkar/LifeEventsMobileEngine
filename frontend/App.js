/**
 * LEME - Life Events Mobile Engine
 * Final Demo Build - Full-Width Edge-to-Edge UI
 * Black/Charcoal/Crimson Theme
 */

import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Animated, Alert, Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const THEME = {
  bg: '#0A0A0A',
  card: '#1A1A1A',
  border: 'rgba(225, 29, 72, 0.25)',
  primary: '#E11D48',
  gold: '#FFD700',
  text: '#FFFFFF',
  textSec: '#A0A0A0',
  textTer: '#707070',
  success: '#10B981',
  amber: '#F59E0B',
  navBg: 'rgba(26, 26, 26, 0.9)',
};

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const theme = THEME;
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
const useTheme = () => useContext(ThemeContext);

// ============================================
// HOME SCREEN - Full-Width Mastery
// ============================================
function HomeScreen() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(80);
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showVisa, setShowVisa] = useState(false);

  const progressAnim = useRef(new Animated.Value(80)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;
  const sealScale = useRef(new Animated.Value(0)).current;
  const visaSlide = useRef(new Animated.Value(500)).current;

  const handleFinalize = () => {
    setScanning(true);

    Animated.sequence([
      Animated.timing(scanAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
      Animated.parallel([
        Animated.timing(progressAnim, { toValue: 100, duration: 1000, useNativeDriver: false }),
        Animated.spring(sealScale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]),
    ]).start(() => {
      setProgress(100);
      setScanning(false);
      setVerified(true);
      setTimeout(() => {
        setShowVisa(true);
        Animated.spring(visaSlide, { toValue: 0, friction: 7, useNativeDriver: true }).start();
      }, 500);
    });
  };

  const quickActions = [
    { id: 1, title: 'Scan QR', icon: '📱' },
    { id: 2, title: 'Pay Fees', icon: '💳' },
    { id: 3, title: 'Track ID', icon: '🆔' },
    { id: 4, title: 'Help Center', icon: '💬' },
  ];

  const lifeEvents = [
    { id: 1, title: 'Starting a Business', icon: '🏢', desc: 'Trade license, office lease, and DED registration', progress: 30 },
    { id: 2, title: 'Getting Married', icon: '💍', desc: 'Marriage registration with MOHAP and documentation', progress: 0 },
    { id: 3, title: 'Buying Property', icon: '🏠', desc: 'Property registration, mortgage, and DLD transfer', progress: 0 },
    { id: 4, title: 'Renewing Residency', icon: '🛂', desc: 'Visa renewal, medical tests, and GDRFA processing', progress: 0 },
    { id: 5, title: 'Retiring', icon: '🌴', desc: 'Pension setup, visa transition, and financial planning', progress: 0 },
  ];

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView edges={['top']} style={s.flex}>
        <ScrollView contentContainerStyle={s.scrollFull} showsVerticalScrollIndicator={false}>
          <View style={s.headerFull}>
            <Text style={[s.greet, { color: theme.text }]}>Good evening, Ahmed 👋</Text>
            <Text style={[s.subGreet, { color: theme.textSec }]}>
              Your baby's documents are almost ready
            </Text>
          </View>

          {/* Hero Journey - Full Width */}
          <View style={[s.heroFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={s.heroTop}>
              <View>
                <Text style={[s.heroTitle, { color: theme.text }]}>Baby Passport & Visa</Text>
                <Text style={[s.heroStat, { color: verified ? theme.gold : theme.primary }]}>
                  {verified ? 'Digital Copy Verified' : 'Final Step - 80%'}
                </Text>
              </View>
              <View style={[s.pctBadge, { backgroundColor: `${verified ? theme.gold : theme.primary}15` }]}>
                <Text style={[s.pctText, { color: verified ? theme.gold : theme.primary }]}>
                  {progress}%
                </Text>
              </View>
            </View>

            <View style={s.ringWrap}>
              <View style={[s.ring, { borderColor: theme.border }]}>
                <View style={[s.ringFill, {
                  borderTopColor: verified ? theme.gold : theme.primary,
                  borderRightColor: verified ? theme.gold : theme.primary,
                  transform: [{ rotate: `${(progress / 100) * 360}deg` }]
                }]} />
                <View style={s.ringCenter}>
                  {verified ? (
                    <Animated.View style={{ transform: [{ scale: sealScale }], alignItems: 'center' }}>
                      <Text style={{ fontSize: 56 }}>🏆</Text>
                      <Text style={[s.verText, { color: theme.gold }]}>Verified</Text>
                    </Animated.View>
                  ) : (
                    <Text style={[s.ringPct, { color: theme.text }]}>{Math.floor(progress)}%</Text>
                  )}
                </View>
              </View>
            </View>

            {scanning && (
              <View style={[s.scanBox, { backgroundColor: `${theme.primary}12` }]}>
                <Text style={{ fontSize: 52 }}>👤</Text>
                <Text style={[s.scanText, { color: theme.primary }]}>Biometric Scanning...</Text>
                <View style={[s.scanBar, { backgroundColor: theme.primary }]} />
              </View>
            )}

            {!verified && !scanning && (
              <TouchableOpacity style={[s.finalBtn, { backgroundColor: theme.primary }]} onPress={handleFinalize}>
                <Text style={s.finalText}>🔐 Finalize Digital Identity</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Gold-Embossed UAE Visa Page */}
          {showVisa && (
            <Animated.View style={[s.visaFull, {
              backgroundColor: theme.card,
              borderColor: theme.gold,
              transform: [{ translateY: visaSlide }]
            }]}>
              <View style={s.visaHeader}>
                <Text style={{ fontSize: 48 }}>🇦🇪</Text>
                <View style={{ marginLeft: 14 }}>
                  <Text style={[s.visaTitle, { color: theme.text }]}>UAE Residence Visa</Text>
                  <Text style={[s.visaSub, { color: theme.gold }]}>Digital Copy Verified</Text>
                </View>
              </View>

              <View style={s.goldSeal}>
                <Text style={{ fontSize: 80, color: theme.gold }}>🏆</Text>
              </View>

              <View style={s.visaDetails}>
                <View style={s.visaRow}>
                  <Text style={[s.visaLabel, { color: theme.textSec }]}>Full Name</Text>
                  <Text style={[s.visaValue, { color: theme.text }]}>Omar Ahmed Al-Mansouri</Text>
                </View>
                <View style={s.visaRow}>
                  <Text style={[s.visaLabel, { color: theme.textSec }]}>Issued By</Text>
                  <Text style={[s.visaValue, { color: theme.text }]}>GDRFA Dubai</Text>
                </View>
                <View style={s.visaRow}>
                  <Text style={[s.visaLabel, { color: theme.textSec }]}>Valid Until</Text>
                  <Text style={[s.visaValue, { color: theme.success }]}>20 Jan 2027</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Quick Actions - 2x2 Grid Full Width */}
          <Text style={[s.secTitle, { color: theme.text }]}>Quick Actions</Text>
          <View style={s.quickGrid}>
            {quickActions.map(q => (
              <TouchableOpacity key={q.id} style={[s.quickTile, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={{ fontSize: 40 }}>{q.icon}</Text>
                <Text style={[s.quickText, { color: theme.text }]}>{q.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Scrollable Life Events */}
          <Text style={[s.secTitle, { color: theme.text }]}>Life Events</Text>
          {lifeEvents.map(evt => (
            <TouchableOpacity key={evt.id} style={[s.eventFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={s.eventLeft}>
                <Text style={{ fontSize: 40, marginRight: 16 }}>{evt.icon}</Text>
                <View style={s.eventInfo}>
                  <Text style={[s.eventTitle, { color: theme.text }]}>{evt.title}</Text>
                  <Text style={[s.eventDesc, { color: theme.textSec }]}>{evt.desc}</Text>
                  <Text style={[s.eventProg, { color: theme.primary }]}>
                    {evt.progress}% Complete
                  </Text>
                </View>
              </View>
              <Text style={[s.eventChev, { color: theme.textTer }]}>›</Text>
            </TouchableOpacity>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ============================================
// DOCUMENTS - Edge-to-Edge Folders
// ============================================
function DocumentsScreen() {
  const { theme } = useTheme();

  const recentlyVerified = [
    { id: 1, title: 'Tenancy Contract', date: 'Verified Jan 15, 2026' },
    { id: 2, title: 'Trade License', date: 'Verified Jan 12, 2026' },
    { id: 3, title: 'Health Insurance Policy', date: 'Verified Jan 10, 2026' },
    { id: 4, title: 'Labor Contract', date: 'Verified Jan 08, 2026' },
    { id: 5, title: 'Bank Statements', date: 'Verified Jan 05, 2026' },
  ];

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView edges={['top']} style={s.flex}>
        <View style={s.screenHead}>
          <Text style={[s.screenTitle, { color: theme.text }]}>Smart Vault 🔐</Text>
          <Text style={[s.screenSub, { color: theme.textSec }]}>Managed by MOI & GDRFA</Text>
        </View>

        <ScrollView contentContainerStyle={s.scrollFull} showsVerticalScrollIndicator={false}>
          {/* Urgency Module - Side-by-Side Large Cards */}
          <Text style={[s.secTitle, { color: theme.text }]}>⚠️ Expiry Alerts</Text>
          <View style={s.urgencyRow}>
            <View style={[s.urgencyCard, { backgroundColor: theme.card, borderColor: theme.primary }]}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🆔</Text>
              <Text style={[s.urgencyTitle, { color: theme.text }]}>Emirates ID</Text>
              <Text style={[s.urgencyDays, { color: theme.primary }]}>15 days left</Text>
            </View>
            <View style={[s.urgencyCard, { backgroundColor: theme.card, borderColor: theme.amber }]}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🛂</Text>
              <Text style={[s.urgencyTitle, { color: theme.text }]}>Passport</Text>
              <Text style={[s.urgencyDays, { color: theme.amber }]}>45 days left</Text>
            </View>
          </View>

          {/* Vertical Folder Stack - Full Width */}
          <Text style={[s.secTitle, { color: theme.text }]}>📁 Document Folders</Text>
          <TouchableOpacity style={[s.folderFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ fontSize: 48, marginRight: 18 }}>🆔</Text>
            <View style={s.folderInfo}>
              <Text style={[s.folderTitle, { color: theme.text }]}>Identity</Text>
              <Text style={[s.folderCount, { color: theme.textSec }]}>4 files • Passport, EID, Family Book</Text>
            </View>
            <Text style={[s.folderChev, { color: theme.textTer }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.folderFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ fontSize: 48, marginRight: 18 }}>🏥</Text>
            <View style={s.folderInfo}>
              <Text style={[s.folderTitle, { color: theme.text }]}>Medical</Text>
              <Text style={[s.folderCount, { color: theme.textSec }]}>8 files • Insurance, Vaccination Records</Text>
            </View>
            <Text style={[s.folderChev, { color: theme.textTer }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.folderFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ fontSize: 48, marginRight: 18 }}>💰</Text>
            <View style={s.folderInfo}>
              <Text style={[s.folderTitle, { color: theme.text }]}>Financial</Text>
              <Text style={[s.folderCount, { color: theme.textSec }]}>12 files • Tax Returns, Bank Statements</Text>
            </View>
            <Text style={[s.folderChev, { color: theme.textTer }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.folderFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ fontSize: 48, marginRight: 18 }}>🎓</Text>
            <View style={s.folderInfo}>
              <Text style={[s.folderTitle, { color: theme.text }]}>Education</Text>
              <Text style={[s.folderCount, { color: theme.textSec }]}>3 files • Degrees, Transcripts</Text>
            </View>
            <Text style={[s.folderChev, { color: theme.textTer }]}>›</Text>
          </TouchableOpacity>

          {/* Recently Verified Section */}
          <Text style={[s.secTitle, { color: theme.text }]}>✅ Recently Verified</Text>
          {recentlyVerified.map(doc => (
            <View key={doc.id} style={[s.recentFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View>
                <Text style={[s.recentTitle, { color: theme.text }]}>{doc.title}</Text>
                <Text style={[s.recentDate, { color: theme.textSec }]}>{doc.date}</Text>
              </View>
              <Text style={[s.recentCheck, { color: theme.success }]}>✓</Text>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ============================================
// ACTIVITY - Detailed History
// ============================================
function ActivityScreen() {
  const { theme } = useTheme();

  const timeline = [
    { id: 1, title: 'Hospital Notification', status: 'Completed', done: true },
    { id: 2, title: 'Birth Certificate', status: 'Completed', done: true },
    { id: 3, title: 'Emirates ID Application', status: 'In Progress', active: true },
    { id: 4, title: 'Health Card', status: 'Pending', done: false },
    { id: 5, title: 'Issuance', status: 'Pending', done: false },
  ];

  const history = [
    { id: 1, title: 'Utility Bill Paid - DEWA', agency: 'DEWA', time: 'Today' },
    { id: 2, title: 'Sponsorship Fee Settled', agency: 'GDRFA', time: 'Yesterday' },
    { id: 3, title: 'Trade Name Reservation: Approved', agency: 'DED Dubai', time: '3 days ago' },
    { id: 4, title: 'Labor Contract Digital Sign: Completed', agency: 'MOHRE', time: 'Last week' },
    { id: 5, title: 'Office Lease Registered', agency: 'DLD', time: '1 week ago' },
    { id: 6, title: 'Health Insurance Activated', agency: 'DHA', time: '2 weeks ago' },
    { id: 7, title: 'Bank Account Opened', agency: 'Emirates NBD', time: '2 weeks ago' },
    { id: 8, title: 'Educational Certificates Verified', agency: 'MOFA', time: '3 weeks ago' },
  ];

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView edges={['top']} style={s.flex}>
        <View style={s.screenHead}>
          <Text style={[s.screenTitle, { color: theme.text }]}>Progress Timeline</Text>
          <Text style={[s.screenSub, { color: theme.textSec }]}>Tracked by MOI & GDRFA</Text>
        </View>

        <ScrollView contentContainerStyle={s.scrollFull} showsVerticalScrollIndicator={false}>
          {/* Active Status - Full Width */}
          <View style={[s.timeFull, { backgroundColor: theme.card, borderColor: theme.primary }]}>
            <Text style={[s.timeTitle, { color: theme.text }]}>Baby Registration</Text>

            {timeline.map((t, i) => (
              <View key={t.id} style={s.timeStep}>
                <View style={[s.timeDot, {
                  backgroundColor: t.done ? theme.success : t.active ? theme.primary : theme.border
                }]}>
                  <Text style={{ fontSize: 12 }}>{t.done ? '✅' : t.active ? '🔴' : '⚪'}</Text>
                </View>
                {i < timeline.length - 1 && (
                  <View style={[s.timeLine, { backgroundColor: t.done ? theme.success : theme.border }]} />
                )}
                <View style={s.timeContent}>
                  <Text style={[s.timeStepTitle, {
                    color: t.done || t.active ? theme.text : theme.textSec,
                    fontWeight: t.active ? 'bold' : 'normal'
                  }]}>
                    {t.title}
                  </Text>
                  <Text style={[s.timeStepStatus, {
                    color: t.done ? theme.success : t.active ? theme.primary : theme.textTer
                  }]}>
                    {t.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Deep History Feed */}
          <Text style={[s.secTitle, { color: theme.text }]}>Recent Activity</Text>
          {history.map(h => (
            <View key={h.id} style={[s.histFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={s.histLeft}>
                <Text style={[s.histTitle, { color: theme.text }]}>{h.title}</Text>
                <Text style={[s.histAgency, { color: theme.textSec }]}>{h.agency}</Text>
                <Text style={[s.histTime, { color: theme.textTer }]}>{h.time}</Text>
              </View>
              <Text style={[s.histIcon, { color: theme.success }]}>✓</Text>
            </View>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ============================================
// PROFILE - Financial Ledger
// ============================================
function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView edges={['top']} style={s.flex}>
        <ScrollView contentContainerStyle={s.scrollFull}>
          {/* Identity Card - Wide Premium */}
          <View style={[s.idFull, { backgroundColor: theme.card, borderColor: theme.primary }]}>
            <View style={[s.avatarBig, { backgroundColor: theme.primary }]}>
              <Text style={s.avatText}>AM</Text>
            </View>
            <View style={s.idInfo}>
              <Text style={[s.profName, { color: theme.text }]}>Ahmed Al-Mansouri</Text>
              <Text style={[s.profEID, { color: theme.textSec }]}>EID: 784-1992-3847261-7</Text>
            </View>
          </View>

          {/* Investment Dashboard - Large Detailed Card */}
          <View style={[s.investFull, { backgroundColor: theme.card, borderColor: theme.gold }]}>
            <Text style={[s.investTitle, { color: theme.text }]}>Total Care Investment</Text>
            <Text style={[s.investAmount, { color: theme.gold }]}>AED 125,750</Text>

            <View style={[s.breakdown, { borderTopColor: theme.border }]}>
              <View style={s.breakRow}>
                <Text style={[s.breakLabel, { color: theme.textSec }]}>Visa Processing Fees</Text>
                <Text style={[s.breakVal, { color: theme.text }]}>AED 12,500</Text>
              </View>
              <View style={s.breakRow}>
                <Text style={[s.breakLabel, { color: theme.textSec }]}>Office Rent (DED)</Text>
                <Text style={[s.breakVal, { color: theme.text }]}>AED 85,000</Text>
              </View>
              <View style={s.breakRow}>
                <Text style={[s.breakLabel, { color: theme.textSec }]}>Health Insurance (DHA)</Text>
                <Text style={[s.breakVal, { color: theme.text }]}>AED 28,250</Text>
              </View>
            </View>
          </View>

          {/* Dependent Cards - Full Width */}
          <Text style={[s.secTitle, { color: theme.text }]}>Family Sponsorship</Text>
          <View style={[s.depFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={s.depLeft}>
              <Text style={{ fontSize: 44, marginRight: 16 }}>👩</Text>
              <View>
                <Text style={[s.depName, { color: theme.text }]}>Layla Nazir</Text>
                <Text style={[s.depRole, { color: theme.textSec }]}>Spouse</Text>
                <Text style={[s.depExpiry, { color: theme.success }]}>Visa expires in 342 days</Text>
              </View>
            </View>
            <View style={[s.depBadge, { backgroundColor: `${theme.success}20`, borderColor: theme.success }]}>
              <Text style={[s.depStatus, { color: theme.success }]}>Active</Text>
            </View>
          </View>

          <View style={[s.depFull, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={s.depLeft}>
              <Text style={{ fontSize: 44, marginRight: 16 }}>👶</Text>
              <View>
                <Text style={[s.depName, { color: theme.text }]}>Newborn</Text>
                <Text style={[s.depRole, { color: theme.textSec }]}>Baby</Text>
                <Text style={[s.depExpiry, { color: theme.amber }]}>Visa issuance in progress</Text>
              </View>
            </View>
            <View style={[s.depBadge, { backgroundColor: `${theme.amber}20`, borderColor: theme.amber }]}>
              <Text style={[s.depStatus, { color: theme.amber }]}>Pending</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ============================================
// TAB 3: SEARCH - PROACTIVE ASSISTANT
// ============================================
function SearchScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const predicted = [
    'Add dependent to DHA insurance',
    'Renew Trade License via DED',
    'Apply for Golden Visa through GDRFA',
    'Register new office address with MOI',
  ];

  return (
    <View style={[s.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView edges={['top']} style={s.flex}>
        <ScrollView contentContainerStyle={s.searchScroll} showsVerticalScrollIndicator={false}>
          <Text style={[s.searchTitle, { color: theme.text }]}>Ask LEME Anything</Text>

          {/* Pulsing Red Mic */}
          <Animated.View style={[s.micWrap, { transform: [{ scale: pulseAnim }] }]}>
            <TouchableOpacity style={[s.micBtn, { backgroundColor: theme.primary }]}>
              <Text style={{ fontSize: 56 }}>🎤</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Search Bar */}
          <View style={[s.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={{ fontSize: 22, marginRight: 12 }}>🔍</Text>
            <TextInput
              style={[s.searchInput, { color: theme.text }]}
              placeholder="Ask LEME anything..."
              placeholderTextColor={theme.textSec}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {/* Predicted Actions */}
          <Text style={[s.secTitle, { color: theme.text, marginTop: 40 }]}>Predicted Actions</Text>
          {predicted.map((p, i) => (
            <TouchableOpacity key={i} style={[s.predCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[s.predText, { color: theme.text }]}>{p}</Text>
              <Text style={[s.predChev, { color: theme.textTer }]}>›</Text>
            </TouchableOpacity>
          ))}

          <View style={{ height: 140 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ============================================
// FLOATING NAVIGATION
// ============================================
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 70,
          backgroundColor: theme.navBg,
          borderRadius: 35,
          borderWidth: 1.5,
          borderColor: '#E11D48',
          borderTopWidth: 1.5,
          paddingHorizontal: 8,
          paddingVertical: 10,
          shadowColor: '#E11D48',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.35,
          shadowRadius: 20,
          elevation: 20,
        },
        tabBarActiveTintColor: '#E11D48',
        tabBarInactiveTintColor: '#707070',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: -2 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[s.tabIconBox, focused && { backgroundColor: 'rgba(225, 29, 72, 0.15)' }]}>
            <Text style={s.tabIcon}>🏠</Text>
          </View>
        ),
      }} />
      <Tab.Screen name="Vault" component={DocumentsScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[s.tabIconBox, focused && { backgroundColor: 'rgba(225, 29, 72, 0.15)' }]}>
            <Text style={s.tabIcon}>🔐</Text>
          </View>
        ),
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[s.tabIconBox, focused && { backgroundColor: 'rgba(225, 29, 72, 0.15)' }]}>
            <Text style={s.tabIcon}>🔍</Text>
          </View>
        ),
      }} />
      <Tab.Screen name="Activity" component={ActivityScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[s.tabIconBox, focused && { backgroundColor: 'rgba(225, 29, 72, 0.15)' }]}>
            <Text style={s.tabIcon}>📊</Text>
          </View>
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={[s.tabIconBox, focused && { backgroundColor: 'rgba(225, 29, 72, 0.15)' }]}>
            <Text style={s.tabIcon}>👤</Text>
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// ============================================
// STYLES - Full-Width Edge-to-Edge
// ============================================
const { width } = Dimensions.get('window');

const s = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scrollFull: { paddingHorizontal: 15 },

  headerFull: { marginBottom: 20, marginTop: 10 },
  greet: { fontSize: 30, fontWeight: 'bold', marginBottom: 6 },
  subGreet: { fontSize: 15 },

  screenHead: { paddingHorizontal: 15, paddingTop: 18, paddingBottom: 10 },
  screenTitle: { fontSize: 30, fontWeight: 'bold', marginBottom: 5 },
  screenSub: { fontSize: 14 },

  // Home - Hero Full Width
  heroFull: { borderRadius: 26, padding: 26, marginBottom: 20, borderWidth: 1 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  heroStat: { fontSize: 15, fontWeight: '600' },
  pctBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14 },
  pctText: { fontSize: 16, fontWeight: 'bold' },

  ringWrap: { alignItems: 'center', marginBottom: 26 },
  ring: { width: 160, height: 160, borderRadius: 80, borderWidth: 14, justifyContent: 'center', alignItems: 'center' },
  ringFill: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 14,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  ringCenter: { justifyContent: 'center', alignItems: 'center' },
  ringPct: { fontSize: 38, fontWeight: 'bold' },
  verText: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },

  scanBox: { padding: 22, borderRadius: 18, marginBottom: 18, alignItems: 'center' },
  scanText: { fontSize: 17, fontWeight: '600', marginVertical: 14 },
  scanBar: { width: '100%', height: 5, borderRadius: 3 },

  finalBtn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  finalText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },

  // Visa Full Width
  visaFull: { borderRadius: 22, padding: 26, borderWidth: 2, marginBottom: 20 },
  visaHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  visaTitle: { fontSize: 22, fontWeight: 'bold' },
  visaSub: { fontSize: 14, marginTop: 3, fontWeight: '600' },
  goldSeal: { position: 'absolute', right: 26, top: 26, opacity: 0.15 },
  visaDetails: { marginBottom: 10 },
  visaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  visaLabel: { fontSize: 14 },
  visaValue: { fontSize: 15, fontWeight: 'bold' },

  // Quick Actions 2x2
  secTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 14, marginTop: 10 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  quickTile: {
    width: (width - 30 - 12) / 2,
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickText: { fontSize: 13, fontWeight: '600', marginTop: 10 },

  // Life Events Full Width
  eventFull: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderRadius: 20, borderWidth: 1, marginBottom: 14 },
  eventLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 5 },
  eventDesc: { fontSize: 13, marginBottom: 5, lineHeight: 18 },
  eventProg: { fontSize: 13, fontWeight: '600' },
  eventChev: { fontSize: 26, marginLeft: 12 },

  // Documents - Urgency Row
  urgencyRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  urgencyCard: { flex: 1, padding: 24, borderRadius: 22, borderWidth: 2, alignItems: 'center' },
  urgencyTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  urgencyDays: { fontSize: 14, fontWeight: '600' },

  // Folders Full Width Vertical
  folderFull: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 14 },
  folderInfo: { flex: 1 },
  folderTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  folderCount: { fontSize: 13 },
  folderChev: { fontSize: 26, marginLeft: 12 },

  // Recently Verified
  recentFull: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 12 },
  recentTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  recentDate: { fontSize: 13 },
  recentCheck: { fontSize: 26 },

  // Activity Timeline Full Width
  timeFull: { borderRadius: 22, padding: 22, marginBottom: 20, borderWidth: 2 },
  timeTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 22 },
  timeStep: { flexDirection: 'row', marginBottom: 22 },
  timeDot: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  timeLine: { position: 'absolute', left: 14, top: 30, width: 2, height: 26 },
  timeContent: { flex: 1 },
  timeStepTitle: { fontSize: 17, marginBottom: 5 },
  timeStepStatus: { fontSize: 14, fontWeight: '600' },

  // History Full Width
  histFull: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 14 },
  histLeft: { flex: 1 },
  histTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  histAgency: { fontSize: 13, marginBottom: 3 },
  histTime: { fontSize: 12 },
  histIcon: { fontSize: 24 },

  // Profile Full Width
  idFull: { flexDirection: 'row', alignItems: 'center', padding: 24, borderRadius: 24, borderWidth: 2, marginBottom: 20, marginTop: 10 },
  avatarBig: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginRight: 18 },
  avatText: { fontSize: 34, fontWeight: 'bold', color: '#FFF' },
  idInfo: { flex: 1 },
  profName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  profEID: { fontSize: 14 },

  // Investment Full Width
  investFull: { padding: 26, borderRadius: 24, borderWidth: 2, marginBottom: 20 },
  investTitle: { fontSize: 17, fontWeight: '600', marginBottom: 10 },
  investAmount: { fontSize: 38, fontWeight: 'bold', marginBottom: 22 },
  breakdown: { borderTopWidth: 1, paddingTop: 18 },
  breakRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  breakLabel: { fontSize: 15 },
  breakVal: { fontSize: 15, fontWeight: 'bold' },

  // Dependents Full Width
  depFull: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderRadius: 20, borderWidth: 1, marginBottom: 14 },
  depLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  depName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  depRole: { fontSize: 14, marginBottom: 3 },
  depExpiry: { fontSize: 13 },
  depBadge: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 12, borderWidth: 1 },
  depStatus: { fontSize: 13, fontWeight: 'bold' },

  // Tab Icons
  tabIconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  tabIcon: { fontSize: 26 },

  // Search Screen Styles
  searchScroll: { padding: 26, alignItems: 'center' },
  searchTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, marginTop: 20 },
  micWrap: { marginBottom: 26 },
  micBtn: { width: 130, height: 130, borderRadius: 65, justifyContent: 'center', alignItems: 'center', shadowColor: '#E11D48', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 15 },

  searchBar: { flexDirection: 'row', alignItems: 'center', width: '100%', padding: 18, borderRadius: 18, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 16 },

  predCard: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 14 },
  predText: { fontSize: 16 },
  predChev: { fontSize: 24 },
});
