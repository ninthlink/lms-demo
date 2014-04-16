<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:msxsl="urn:schemas-microsoft-com:xslt"
				xmlns:websoft="http://www.websoft.ru"
				version="1.0">
<!--
'*	nav_008_next.xsl
'*	Copyright (c) Websoft, 2007.  All rights reserved.
-->
<xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes"/>
<xsl:param name="objectID"></xsl:param>
<xsl:param name="imagesFolder"></xsl:param>
<!--		 Template: Root    -->
<xsl:template match="/">
	<xsl:apply-templates select="params"/>
</xsl:template>
<!--		 Template: Params    -->
<xsl:template match="params">
<xsl:if test="standard='yes'">
	<div style="display:inline; z-index:900; cursor: hand; cursor: pointer;">
	<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextEnabled</xsl:attribute>
		<img width="75" height="25" border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextImg</xsl:attribute>
			<xsl:attribute name="alt"><xsl:value-of select="alt_enabled"/></xsl:attribute>
			<xsl:attribute name="src"><xsl:value-of select="$imagesFolder"/>ws_next_0.gif</xsl:attribute>
			<xsl:attribute name="onmouseover">CallMethod('nav_008_next','Over', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmouseout">CallMethod('nav_008_next','Out', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmousedown">CallMethod('nav_008_next','Down', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmouseup">CallMethod('nav_008_next','Click', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
		</img>
	</div>
	<div style="display:none; z-index:901;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextPressed</xsl:attribute>
		<img width="75" height="25" border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_3</xsl:attribute>
			<xsl:attribute name="src"><xsl:value-of select="$imagesFolder"/>ws_next_3.gif</xsl:attribute>
		</img>
	</div>
	<div style="display:none; z-index:901;">
	<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextDisabled</xsl:attribute>
		<img width="75" height="25" border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_2</xsl:attribute>
			<xsl:attribute name="src"><xsl:value-of select="$imagesFolder"/>ws_next_2.gif</xsl:attribute>
			<xsl:attribute name="alt"><xsl:value-of select="alt_disabled"/></xsl:attribute>
		</img>
	</div>
	<div style="display:none;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextHighlighted</xsl:attribute>
		<img width="75" height="25" border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_1</xsl:attribute>
			<xsl:attribute name="src"><xsl:value-of select="$imagesFolder"/>ws_next_1.gif</xsl:attribute>
		</img>
	</div>
	<div style="display:none;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextNormal</xsl:attribute>
		<img width="74" height="25" border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_0</xsl:attribute>
			<xsl:attribute name="src"><xsl:value-of select="$imagesFolder"/>ws_next_0.gif</xsl:attribute>
		</img>
	</div>
</xsl:if>
<xsl:if test="standard='no'">
	<div style="display:inline; z-index:900; cursor:hand; cursor: pointer;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextEnabled</xsl:attribute>
		<img border="0">
			<xsl:attribute name="src"><xsl:value-of select="n1_img"/></xsl:attribute>
			<xsl:attribute name="alt"><xsl:value-of select="alt_enabled"/></xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextImg</xsl:attribute>
			<xsl:attribute name="onmouseover">CallMethod('nav_008_next','Over', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmouseout">CallMethod('nav_008_next','Out', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmousedown">CallMethod('nav_008_next','Down', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
			<xsl:attribute name="onmouseup">CallMethod('nav_008_next','Click', { pid: '<xsl:value-of select="$objectID"/>' }); return false;</xsl:attribute>
		</img>
	</div>
	<div style="display:none; z-index:901;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextDisabled</xsl:attribute>
		<img border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_2</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:choose>
					<xsl:when test="n3_img != ''"><xsl:value-of select="n3_img"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="$imagesFolder"/>ws_next_2.gif</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="alt"><xsl:value-of select="alt_disabled"/></xsl:attribute>
		</img>
	</div>
	<div style="display:none;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextHighlighted</xsl:attribute>
		<img border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_1</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:choose>
					<xsl:when test="n2_img != ''"><xsl:value-of select="n2_img"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="$imagesFolder"/>ws_next_1.gif</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
		</img>
	</div>
	<div style="display:none;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextNormal</xsl:attribute>
		<img border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_0</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:choose>
					<xsl:when test="n1_img != ''"><xsl:value-of select="n1_img"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="$imagesFolder"/>ws_next_0.gif</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
		</img>
	</div>
	<div style="display:none;">
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_NextPressed</xsl:attribute>
		<img border="0">
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_Next_3</xsl:attribute>
			<xsl:attribute name="src">
				<xsl:choose>
					<xsl:when test="n4_img != ''"><xsl:value-of select="n4_img"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="$imagesFolder"/>ws_next_3.gif</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
		</img>
	</div>
</xsl:if>
</xsl:template>
</xsl:stylesheet>
