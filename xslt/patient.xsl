<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
  <body>
    <h1>患者情報</h1>
    <table border="1">
      <tr>
        <th style="text-align:left">患者番号</th>
        <td><xsl:value-of select="Patient/xmlio2/patientinfores/Patient_Information/Patient_ID" /></td>
      </tr>
      <tr>
        <th style="text-align:left">氏名</th>
        <td><xsl:value-of select="Patient/xmlio2/patientinfores/Patient_Information/WholeName" /></td>
      </tr>
      <tr>
        <th style="text-align:left">カナ</th>
        <td><xsl:value-of select="Patient/xmlio2/patientinfores/Patient_Information/WholeName_inKana" /></td>
      </tr>
      <tr>
        <th style="text-align:left">生年月日</th>
        <td><xsl:value-of select="Patient/xmlio2/patientinfores/Patient_Information/BirthDate" /></td>
      </tr>
      <tr>
        <th style="text-align:left">性別</th>
        <td>
          <xsl:if test="Patient/xmlio2/patientinfores/Patient_Information/Sex=1">男性</xsl:if>
          <xsl:if test="Patient/xmlio2/patientinfores/Patient_Information/Sex=2">女性</xsl:if>
        </td>
      </tr>
    <tr>
      <th style="text-align:left">ORCA最終取得日時</th>
      <td>
        <xsl:value-of select="Patient/xmlio2/patientinfores/Information_Date"/> 
        <xsl:value-of select="Patient/xmlio2/patientinfores/Information_Time"/>
      </td>
    </tr>
    </table>
  </body>
</html>
</xsl:template>
</xsl:stylesheet>