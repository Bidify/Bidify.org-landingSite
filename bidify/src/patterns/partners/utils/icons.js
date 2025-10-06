import {
  FaHandshake, FaCode, FaGem, FaChartLine, FaPlug, FaShieldAlt, FaHeadset,
  FaRocket, FaUsers, FaGlobe, FaLock, FaServer, FaMobileAlt, FaDesktop,
  FaPalette, FaCogs, FaBolt, FaStar, FaCheckCircle, FaArrowRight,
  FaLightbulb, FaBuilding, FaChartBar, FaCoins, FaGraduationCap
} from 'react-icons/fa';

export const partnershipIcons = {
  handshake: FaHandshake,
  smartContract: FaCode,
  nftSupport: FaGem,
  revenue: FaChartLine,
  integration: FaPlug,
  security: FaShieldAlt,
  support: FaHeadset,
  rocket: FaRocket,
  users: FaUsers,
  globe: FaGlobe,
  lock: FaLock,
  server: FaServer,
  mobile: FaMobileAlt,
  desktop: FaDesktop,
  palette: FaPalette,
  cogs: FaCogs,
  bolt: FaBolt,
  star: FaStar,
  check: FaCheckCircle,
  arrow: FaArrowRight,
  lightbulb: FaLightbulb,
  building: FaBuilding,
  chart: FaChartBar,
  coins: FaCoins,
  graduationCap: FaGraduationCap,
  // Add missing mappings
  plug: FaPlug,
  code: FaCode,
  chartBar: FaChartBar,
  headset: FaHeadset
};

export const getIconComponent = (iconName, size = 24, className = '') => {
  const IconComponent = partnershipIcons[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return null;
  }
  return <IconComponent size={size} className={className} />;
};

export const iconSizes = {
  small: 20,
  medium: 24,
  large: 32,
  xlarge: 48
};