<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:msxsl="urn:schemas-microsoft-com:xslt"
				xmlns:websoft="http://www.websoft.ru"
				version="1.0">
<!--
'*	form_001_input.xsl
'*	Copyright (c) Websoft, 2006.  All rights reserved.
-->
<xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes"/>
<xsl:param name="objectID"></xsl:param>
<!--		 Template: Root    -->
<xsl:template match="/">
	<xsl:apply-templates select="params"/>
</xsl:template>
<!--		 Template: Params    -->
<xsl:template match="params">
	<input type="text">
		<xsl:attribute name="onblur">CallMethod('form_001_input','AcceptInput',{ pid: '<xsl:value-of select="$objectID"/>'});</xsl:attribute>
		<xsl:attribute name="onkeyup">CallMethod('form_001_input','ReadInput',{ pid: '<xsl:value-of select="$objectID"/>'});</xsl:attribute>
		<xsl:attribute name="id"><xsl:value-of select="$objectID" />_input</xsl:attribute>
		<xsl:attribute name="variable"><xsl:value-of select="input_id" /></xsl:attribute>
		<xsl:variable name="maxl"  select="input_maxlength" />
		<xsl:if test="$maxl!=''">
			<xsl:attribute name="maxlength"><xsl:value-of select="input_maxlength" /></xsl:attribute>
		</xsl:if>
		<xsl:attribute name="value"><xsl:value-of select="input_text" /></xsl:attribute>
		<xsl:attribute name="style">position: relative; width: 100%; height: 100%; font-family: <xsl:value-of select="input_font" />; color: <xsl:value-of select="input_font_color" />; font-weight: <xsl:value-of select="input_font_weight" />; font-style: <xsl:value-of select="input_font_style" />; font-size:<xsl:value-of select="input_font_size" />px; text-align: <xsl:value-of select="input_text_align" />; border-width: <xsl:value-of select="input_border_width" />px; border-color: <xsl:value-of select="input_border_color" />; border-style: <xsl:value-of select="input_border_style" />; background-color: <xsl:value-of select="input_bg_color" />;</xsl:attribute>
	</input>
</xsl:template>
</xsl:stylesheet>
