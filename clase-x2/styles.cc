/* Reseteo básico de estilos */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
  background-color: #f4f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
}

/* Contenedor principal estilo móvil */
.container {
  width: 100%;
  max-width: 420px;
  background-color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

/* -----------------------------------
   1. HEADER (Cuadro Negro)
----------------------------------- */
.header-section {
  padding: 20px 20px 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

/* Top Navigation Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-btn .bar {
  width: 24px;
  height: 2px;
  background-color: #222;
  border-radius: 2px;
}

.edit-link {
  color: #222;
  font-weight: 500;
  text-decoration: none;
  font-size: 15px;
}

/* Profile Section */
.profile-card {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-container {
  width: 110px;
  height: 110px;
  margin: 0 auto 12px auto;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 26px;
  font-weight: 700;
  color: #111;
}

/* Stats Row & Bio */
.stats-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.stat-label {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.bio {
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

/* -----------------------------------
   2. MAIN / BODY (Cuadro Rojo)
----------------------------------- */
.main-section {
  padding: 20px;
}

.card {
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-weight: 600;
}

.card-title {
  color: #222;
  font-size: 15px;
}

.card-percentage {
  color: #333;
  font-size: 15px;
}

/* Dynamic Progress Bar */
.progress-bar-bg {
  width: 100%;
  height: 10px;
  background-color: #edf2f7;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-bg.small {
  height: 8px;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4c84f6;
  border-radius: 10px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin-bottom: 12px;
}

.path-card {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 0;
}

.path-icon {
  width: 48px;
  height: 48px;
  background-color: #cddcfa;
  border-radius: 10px;
  flex-shrink: 0;
}

.path-info {
  flex-grow: 1;
}

.path-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.path-title {
  color: #222;
}

.path-percentage {
  color: #333;
}

/* -----------------------------------
   3. FOOTER (Cuadro Amarillo)
----------------------------------- */
.footer-section {
  padding: 0 20px 20px 20px;
}

.subsection-title {
  font-size: 15px;
  font-weight: 600;
  color: #111;
  margin-bottom: 12px;
}

.interests-block {
  margin-bottom: 20px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #fff8ee;
  color: #333;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.learning-stats-block {
  border: 1px solid #eaeaea;
  border-radius: 16px;
  padding: 16px;
}

.stats-grid {
  display: flex;
  justify-content: space-between;
}

.stat-box {
  flex: 1;
  text-align: center;
}

.stat-box:first-child {
  border-right: 1px dashed #e0e0e0;
}

.stat-main {
  font-size: 15px;
  color: #111;
  margin-bottom: 4px;
}

.stat-main .number {
  font-size: 22px;
  font-weight: 700;
}

.subtext {
  font-size: 12px;
  color: #666;
}