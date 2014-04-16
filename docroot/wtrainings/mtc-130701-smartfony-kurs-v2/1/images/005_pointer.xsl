<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                 xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                 xmlns:websoft="http://www.websoft.ru"
                 xmlns:v="urn:schemas-microsoft-com:vml"
                 version="1.0">
<!--
'*    005_pointer.xsl
'*	Copyright (c) Websoft Ltd., Russia.  All rights reserved.
-->

<xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes"/>

<xsl:param name="moduleImagesFolder"></xsl:param>
<xsl:param name="imagesFolder"></xsl:param>
<xsl:param name="objectID"></xsl:param>
<xsl:param name="width"></xsl:param>
<xsl:param name="height"></xsl:param>

<xsl:template match="/"><xsl:apply-templates select="params"/></xsl:template>

<xsl:template match="params">
	<xsl:variable name="object.template">005_pointer</xsl:variable>
    <xsl:variable name="filter">
        <xsl:choose>
            <xsl:when test="pointer_transition/text()='random_dissolve'">progid:DXImageTransform.Microsoft.RandomDissolve(duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_star_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='star', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_star_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='star', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_diamond_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='diamond', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_diamond_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='diamond', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_cross_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='cross', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_cross_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='cross', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_circle_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='circle', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_circle_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='circle', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_square_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='square', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_square_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='square', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_plus_out'">progid:DXImageTransform.Microsoft.Iris(irisStyle='plus', motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='iris_plus_in'">progid:DXImageTransform.Microsoft.Iris(irisStyle='plus', motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='barn_vert_out'">progid:DXImageTransform.Microsoft.Barn(orientation='vertical' motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='barn_vert_in'">progid:DXImageTransform.Microsoft.Barn(orientation='vertical' motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='barn_hor_out'">progid:DXImageTransform.Microsoft.Barn(orientation='horizontal' motion='out', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='barn_hor_in'">progid:DXImageTransform.Microsoft.Barn(orientation='horizontal' motion='in', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='pixelate'">progid:DXImageTransform.Microsoft.Pixelate(duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='inset'">progid:DXImageTransform.Microsoft.Inset(duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='checkeboard_left'">progid:DXImageTransform.Microsoft.Checkerboard(Direction='left', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='checkerboard_right'">progid:DXImageTransform.Microsoft.Checkerboard(Direction='right', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='checkerboard_down'">progid:DXImageTransform.Microsoft.Checkerboard(Direction='down', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='checkerboard_up'">progid:DXImageTransform.Microsoft.Checkerboard(Direction='up', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='random_bars_hor'">progid:DXImageTransform.Microsoft.RandomBars(motion='horizontal', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='random_bars_vert'">progid:DXImageTransform.Microsoft.RandomBars(motion='vertical', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='slide_push'">progid:DXImageTransform.Microsoft.Slide(bands=5, slideStyle='push', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='slide_swap'">progid:DXImageTransform.Microsoft.Slide(bands=5, slidestyle='swap', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='slide_hide'">progid:DXImageTransform.Microsoft.Slide(bands=5, slidestyle='hide', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='spiral'">progid:DXImageTransform.Microsoft.Spiral(duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='stretch_push'">progid:DXImageTransform.Microsoft.Stretch(stretchStyle='push', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='stretch_spin'">progid:DXImageTransform.Microsoft.Stretch(stretchstyle='spin', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='stretch_hide'">progid:DXImageTransform.Microsoft.Stretch(stretchstyle='hide', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='wipe_forward'">progid:DXImageTransform.Microsoft.Wipe(GradientSize=.50, wipeStyle=0, motion='forward', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='wipe_radial_clock'">progid:DXImageTransform.Microsoft.RadialWipe(wipeStyle='clock', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='wipe_radial_radial'">progid:DXImageTransform.Microsoft.RadialWipe(wipeStyle='radial', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='wipe_radial_wedge'">progid:DXImageTransform.Microsoft.RadialWipe(wipeStyle='wedge', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='zigzag_leftup'">progid:DXImageTransform.Microsoft.Zigzag(motion='leftup', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='zigzag_rightup'">progid:DXImageTransform.Microsoft.Zigzag(motion='rightup', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='zigzag_leftdown'">progid:DXImageTransform.Microsoft.Zigzag(motion='leftdown', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='zigzag_rightdown'">progid:DXImageTransform.Microsoft.Zigzag(motion='rightdown', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='strips_leftup'">progid:DXImageTransform.Microsoft.Strips(motion='leftup', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='strips_rightup'">progid:DXImageTransform.Microsoft.Strips(motion='rightup', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='strips_leftdown'">progid:DXImageTransform.Microsoft.Strips(motion='leftdown', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='strips_rightdown'">progid:DXImageTransform.Microsoft.Strips(motion='rightdown', duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='wheel'">progid:DXImageTransform.Microsoft.Wheel(spokes=8, duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
            <xsl:when test="pointer_transition/text()='fade'">progid:DXImageTransform.Microsoft.Fade(overlap=1, duration=<xsl:value-of select="pointer_transition_duration"/>)</xsl:when>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="pointer.color1">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color1"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.color1.over">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#4D82D2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#669999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#CB9D7B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FF78A9</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#9BDC4E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#A6A6A6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#66CCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#A5BC03</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FF9966</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FB8AD8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FA6666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#8995CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#86DBE0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FAD953</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#B979F1</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color1_over"/></xsl:when>
            <xsl:otherwise>#FF9966</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.color1.selected">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#4D82D2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#669999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#CB9D7B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FF78A9</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#9BDC4E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#A6A6A6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#66CCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#A5BC03</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FF9966</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FB8AD8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FA6666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#8995CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#86DBE0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FAD953</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#B979F1</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color1_selected"/></xsl:when>
            <xsl:otherwise>#FF9966</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.color2">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000033</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#BED5F8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#A8E3C2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#FAE1C8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FFDBE7</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#DDFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#E6E6E6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#DFEFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#F5F5CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FFE2C4</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FAE6FA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FFE0E0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#E1E9F5</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#A6DEDE</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#EDDCFA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#EEEEFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color2"/></xsl:when>
            <xsl:otherwise>#FFE2C4</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.color2.over">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000033</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#BED5F8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#A8E3C2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#FAE1C8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FFDBE7</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#DDFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#E6E6E6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#DFEFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#F5F5CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FFE2C4</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FAE6FA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FFE0E0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#E1E9F5</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#A6DEDE</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#EDDCFA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#EEEEFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color2_over"/></xsl:when>
            <xsl:otherwise>#FFE2C4</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.color2.selected">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000033</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#BED5F8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#A8E3C2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#FAE1C8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FFDBE7</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#DDFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#E6E6E6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#DFEFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#F5F5CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FFE2C4</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FAE6FA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FFE0E0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#E1E9F5</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#A6DEDE</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFFFCC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#EDDCFA</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#EEEEFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="color2_selected"/></xsl:when>
            <xsl:otherwise>#FFE2C4</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontcolor">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#999999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="font_color"/></xsl:when>
            <xsl:otherwise>#FFFFFF</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontcolor.over">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#999999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="font_color_over"/></xsl:when>
            <xsl:otherwise>#FFFFFF</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontcolor.selected">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#CCCCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#004D8F</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#006666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#8B5932</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#D10D51</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#669900</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#666666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#336699</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#798A02</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#CC6600</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#CC33CC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#CC3333</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#496B9E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#21949B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#CBA50B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#611999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#9999CC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="font_color_selected"/></xsl:when>
            <xsl:otherwise>#CC6600</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.strokecolor">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="strokecolor"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.strokecolor.over">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#4D82D2</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#669999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#CB9D7B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#FF78A9</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#9BDC4E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#A6A6A6</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#66CCFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#A5BC03</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#FF9966</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#FB8AD8</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#FA6666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#8995CB</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#86DBE0</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#FAD953</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#B979F1</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="strokecolor_over"/></xsl:when>
            <xsl:otherwise>#FF9966</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.strokecolor.selected">
        <xsl:choose>
            <xsl:when test="pointer_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='blue'">#214D8F</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='bluegreen'">#1E8787</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='brown'">#8B5932</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='deeppink'">#D10D51</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='green'">#669900</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='grey'">#666666</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='lightblue'">#3399CC</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='olive'">#798A02</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='orange'">#CC6600</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='pink'">#CC3333</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='red'">#CC3333</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='steelblue'">#496B9E</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='turquoise'">#21949B</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='yellow'">#E4B806</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='violet'">#611999</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="pointer_color_scheme/text()='custom'"><xsl:value-of select="strokecolor_selected"/></xsl:when>
            <xsl:otherwise>#CC6600</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontfamily">
        <xsl:choose>
            <xsl:when test="font_family='custom'"><xsl:value-of select="user_font_family"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="font_family"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontfamily.over">
        <xsl:choose>
            <xsl:when test="font_family='custom'"><xsl:value-of select="user_font_family_over"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="font_family_over"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.fontfamily.selected">
        <xsl:choose>
            <xsl:when test="font_family='custom'"><xsl:value-of select="user_font_family_selected"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="font_family_selected"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="short.color1">
        <xsl:choose>
            <xsl:when test="short_desc_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.color1"/></xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='custom'"><xsl:value-of select="short.color1"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="short.color2">
        <xsl:choose>
            <xsl:when test="short_desc_color_scheme/text()='black'">#000033</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='blue'">#BED5F8</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='bluegreen'">#A8E3C2</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='brown'">#FAE1C8</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='deeppink'">#FFDBE7</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='green'">#DDFFCC</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='grey'">#E6E6E6</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='lightblue'">#DFEFFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='olive'">#F5F5CB</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='orange'">#FFE2C4</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pink'">#FAE6FA</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='red'">#FFE0E0</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='steelblue'">#E1E9F5</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='turquoise'">#A6DEDE</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='yellow'">#FFFFCC</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='violet'">#EDDCFA</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='white'">#EEEEFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.color2"/></xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='custom'"><xsl:value-of select="short.color2"/></xsl:when>
            <xsl:otherwise>#FFE2C4</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="short.strokecolor">
        <xsl:choose>
            <xsl:when test="short_desc_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.strokecolor"/></xsl:when>
            <xsl:when test="short_desc_color_scheme/text()='custom'"><xsl:value-of select="short.strokecolor"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>

    <xsl:variable name="desc.color1">
        <xsl:choose>
            <xsl:when test="desc_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="desc_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="desc_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="desc_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="desc_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="desc_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="desc_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="desc_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="desc_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="desc_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="desc_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="desc_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="desc_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="desc_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.color1"/></xsl:when>
            <xsl:when test="desc_color_scheme/text()='custom'"><xsl:value-of select="desc.color1"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="desc.color2">
        <xsl:choose>
            <xsl:when test="desc_color_scheme/text()='black'">#000033</xsl:when>
            <xsl:when test="desc_color_scheme/text()='blue'">#BED5F8</xsl:when>
            <xsl:when test="desc_color_scheme/text()='bluegreen'">#A8E3C2</xsl:when>
            <xsl:when test="desc_color_scheme/text()='brown'">#FAE1C8</xsl:when>
            <xsl:when test="desc_color_scheme/text()='deeppink'">#FFDBE7</xsl:when>
            <xsl:when test="desc_color_scheme/text()='green'">#DDFFCC</xsl:when>
            <xsl:when test="desc_color_scheme/text()='grey'">#E6E6E6</xsl:when>
            <xsl:when test="desc_color_scheme/text()='lightblue'">#DFEFFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='olive'">#F5F5CB</xsl:when>
            <xsl:when test="desc_color_scheme/text()='orange'">#FFE2C4</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pink'">#FAE6FA</xsl:when>
            <xsl:when test="desc_color_scheme/text()='red'">#FFE0E0</xsl:when>
            <xsl:when test="desc_color_scheme/text()='steelblue'">#E1E9F5</xsl:when>
            <xsl:when test="desc_color_scheme/text()='turquoise'">#A6DEDE</xsl:when>
            <xsl:when test="desc_color_scheme/text()='yellow'">#FFFFCC</xsl:when>
            <xsl:when test="desc_color_scheme/text()='violet'">#EDDCFA</xsl:when>
            <xsl:when test="desc_color_scheme/text()='white'">#EEEEFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.color2"/></xsl:when>
            <xsl:when test="desc_color_scheme/text()='custom'"><xsl:value-of select="desc.color2"/></xsl:when>
            <xsl:otherwise>#FFE2C4</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>
    <xsl:variable name="desc.strokecolor">
        <xsl:choose>
            <xsl:when test="desc_color_scheme/text()='black'">#000000</xsl:when>
            <xsl:when test="desc_color_scheme/text()='blue'">#3967AC</xsl:when>
            <xsl:when test="desc_color_scheme/text()='bluegreen'">#357E7E</xsl:when>
            <xsl:when test="desc_color_scheme/text()='brown'">#BD865C</xsl:when>
            <xsl:when test="desc_color_scheme/text()='deeppink'">#EC4E7A</xsl:when>
            <xsl:when test="desc_color_scheme/text()='green'">#7EB83A</xsl:when>
            <xsl:when test="desc_color_scheme/text()='grey'">#969696</xsl:when>
            <xsl:when test="desc_color_scheme/text()='lightblue'">#33CCFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='olive'">#91A030</xsl:when>
            <xsl:when test="desc_color_scheme/text()='orange'">#FF9900</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pink'">#FF61CE</xsl:when>
            <xsl:when test="desc_color_scheme/text()='red'">#FA2C2C</xsl:when>
            <xsl:when test="desc_color_scheme/text()='steelblue'">#6A84BF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='turquoise'">#53CFD7</xsl:when>
            <xsl:when test="desc_color_scheme/text()='yellow'">#FFCC00</xsl:when>
            <xsl:when test="desc_color_scheme/text()='violet'">#8C46C2</xsl:when>
            <xsl:when test="desc_color_scheme/text()='white'">#FFFFFF</xsl:when>
            <xsl:when test="desc_color_scheme/text()='pointer'"><xsl:value-of select="$pointer.strokecolor"/></xsl:when>
            <xsl:when test="desc_color_scheme/text()='custom'"><xsl:value-of select="desc.strokecolor"/></xsl:when>
            <xsl:otherwise>#FF9900</xsl:otherwise>
       </xsl:choose>
    </xsl:variable>






    <xsl:variable name="pointer.position"><xsl:value-of select="pointer_position"/></xsl:variable>
    <xsl:variable name="pointer.size"><xsl:value-of select="pointer_size"/></xsl:variable>
    <xsl:variable name="pointer.width">
        <xsl:choose>
            <xsl:when test="$pointer.size='1'">12</xsl:when>
            <xsl:when test="$pointer.size='2'">20</xsl:when>
            <xsl:when test="$pointer.size='3'">30</xsl:when>
            <xsl:otherwise>20</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.height">
        <xsl:choose>
            <xsl:when test="$pointer.size='1'">12</xsl:when>
            <xsl:when test="$pointer.size='2'">20</xsl:when>
            <xsl:when test="$pointer.size='3'">30</xsl:when>
            <xsl:otherwise>20</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="y_middle" select="round((number($height)-number($pointer.height)) div 2)"/>
    <xsl:variable name="y_bottom" select="number($height)-number($pointer.height) - 2*number(strokewidth)"/>
    <xsl:variable name="x_center" select="round((number($width)-number($pointer.width)) div 2)"/>
    <xsl:variable name="x_right" select="number($width) - number($pointer.width) - 2*number(strokewidth)"/>

    <xsl:variable name="pointer.left">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'">0</xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="$x_center"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="$x_right"/></xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="$x_right"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="$x_right"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="$x_center"/></xsl:when>
            <xsl:when test="$pointer.position='BL'">0</xsl:when>
            <xsl:when test="$pointer.position='ML'">0</xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="pointer.top">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'">0</xsl:when>
            <xsl:when test="$pointer.position='TC'">0</xsl:when>
            <xsl:when test="$pointer.position='TR'">0</xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="$y_middle"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="$y_bottom"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="$y_bottom"/></xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="$y_bottom"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="$y_middle"/></xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="short.left">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="round(number($pointer.width) div 3)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'">0</xsl:when>
            <xsl:when test="$pointer.position='TR'">0</xsl:when>
            <xsl:when test="$pointer.position='MR'">0</xsl:when>
            <xsl:when test="$pointer.position='BR'">0</xsl:when>
            <xsl:when test="$pointer.position='BC'">0</xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="round(number($pointer.width) div 3)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="round(number($pointer.width) div 2)"/></xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="short.top">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="round(number($pointer.height) div 3)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="round(number($pointer.height) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="round(number($pointer.height) div 3)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'">0</xsl:when>
            <xsl:when test="$pointer.position='BR'">0</xsl:when>
            <xsl:when test="$pointer.position='BC'">0</xsl:when>
            <xsl:when test="$pointer.position='BL'">0</xsl:when>
            <xsl:when test="$pointer.position='ML'">0</xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="short.width">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="number($width) - round(number($pointer.width) div 3) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="number($width) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 3) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 3) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="number($width) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="number($width) - round(number($pointer.width) div 3) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="number($width) - number($pointer.width) - 2*number(desc_strokewidth)"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="short.height">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="round(number($height) - round(number($pointer.height) div 3)-2*number(desc_strokewidth))"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="number($height) - round(number($pointer.height) div 3)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="number($height) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="number($height) - round(number($pointer.height) div 3)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="number($height) - round(number($pointer.height) div 3)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="number($height) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="number($height) - number($pointer.height) - 2*number(desc_strokewidth)"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="desc.left">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="round(number($pointer.width) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'">0</xsl:when>
            <xsl:when test="$pointer.position='TR'">0</xsl:when>
            <xsl:when test="$pointer.position='MR'">0</xsl:when>
            <xsl:when test="$pointer.position='BR'">0</xsl:when>
            <xsl:when test="$pointer.position='BC'">0</xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="round(number($pointer.width) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="round(number($pointer.width) div 2)"/></xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="desc.top">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="round(number($pointer.height) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="round(number($pointer.height) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="round(number($pointer.height) div 2)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'">0</xsl:when>
            <xsl:when test="$pointer.position='BR'">0</xsl:when>
            <xsl:when test="$pointer.position='BC'">0</xsl:when>
            <xsl:when test="$pointer.position='BL'">0</xsl:when>
            <xsl:when test="$pointer.position='ML'">0</xsl:when>
            <xsl:otherwise>0</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="desc.width">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="number($width) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="number($width) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="number($width) - round(number($pointer.width) div 2) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="number($width) - number($pointer.width) - 2*number(desc_strokewidth)"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="desc.height">
        <xsl:choose>
            <xsl:when test="$pointer.position='TL'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TC'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='TR'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='MR'"><xsl:value-of select="number($height) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BR'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BC'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='BL'"><xsl:value-of select="number($height) - round(number($pointer.height) div 2)-2*number(desc_strokewidth)"/></xsl:when>
            <xsl:when test="$pointer.position='ML'"><xsl:value-of select="number($height) - 2*number(desc_strokewidth)"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="number($height) - number($pointer.height) - 2*number(desc_strokewidth)"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

	<xsl:variable name="short.strokewidth">
		<xsl:choose>
			<xsl:when test="string(number(short_desc_strokewidth/text()))='NaN'">2</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="number(short_desc_strokewidth) &gt; 0"><xsl:value-of select="round(number(short_desc_strokewidth/text()))"/></xsl:when>
					<xsl:otherwise>2</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="short.angle">
		<xsl:choose>
			<xsl:when test="string(number(short_desc_angle/text()))='NaN'">0</xsl:when>
			<xsl:otherwise><xsl:value-of select="short_desc_angle/text()"/></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="short.radius">
		<xsl:choose>
			<xsl:when test="string(number(short_desc_arcsize/text()))='NaN'">
				<xsl:choose>
					<xsl:when test="number($short.width) &gt; number($short.height)"><xsl:value-of select="round(0.025*number($short.height))"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="round(0.025*number($short.width))"/></xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="number($short.width) &gt; number($short.height)"><xsl:value-of select="round(number(short_desc_arcsize/text())*number($short.height))"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="round(number(short_desc_arcsize/text())*number($short.width))"/></xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="short.unit.x" select="10000 div number($short.width)"/>
	<xsl:variable name="short.unit.y" select="10000 div number($short.height)"/>
	<xsl:variable name="short.radius.x" select="round(number($short.radius)*number($short.unit.x))"/>
	<xsl:variable name="short.radius.y" select="round(number($short.radius)*number($short.unit.y))"/>
	<xsl:variable name="short.x0" select="0"/>
	<xsl:variable name="short.x1" select="number($short.radius.x)"/>
	<xsl:variable name="short.x2" select="10000 - number($short.radius.x)"/>
	<xsl:variable name="short.x3" select="10000"/>
	<xsl:variable name="short.y0" select="0"/>
	<xsl:variable name="short.y1" select="number($short.radius.y)"/>
	<xsl:variable name="short.y2" select="10000 - number($short.radius.y)"/>
	<xsl:variable name="short.y3" select="10000"/>
	<xsl:variable name="short.path">M<xsl:value-of select="$short.x0"/>,<xsl:value-of select="$short.y1"/> QY<xsl:value-of select="$short.x1"/>,<xsl:value-of select="$short.y0"/> L<xsl:value-of select="$short.x2"/>,<xsl:value-of select="$short.y0"/> QX<xsl:value-of select="$short.x3"/>,<xsl:value-of select="$short.y1"/> L<xsl:value-of select="$short.x3"/>,<xsl:value-of select="$short.y2"/> QY<xsl:value-of select="$short.x2"/>,<xsl:value-of select="$short.y3"/> L<xsl:value-of select="$short.x1"/>,<xsl:value-of select="$short.y3"/> QX<xsl:value-of select="$short.x0"/>,<xsl:value-of select="$short.y2"/> XE</xsl:variable>
	<xsl:variable name="short.gradient.moz">90deg, <xsl:value-of select="$short.color1"/>, <xsl:value-of select="$short.color2"/></xsl:variable>
	<xsl:variable name="short.gradient.opera">90deg, <xsl:value-of select="$short.color1"/>, <xsl:value-of select="$short.color2"/></xsl:variable>
	<xsl:variable name="short.gradient.webkit">linear, 50% 100%, 50% 0%, from(<xsl:value-of select="$short.color1"/>), to(<xsl:value-of select="$short.color2"/>)</xsl:variable>
	<xsl:variable name="short.shadow.offset" select="round(0.5*number($short.strokewidth) + 3)"/>

	<xsl:variable name="full.width" select="$desc.width"/>
	<xsl:variable name="full.height" select="$desc.height"/>
	<xsl:variable name="full.strokewidth">
		<xsl:choose>
			<xsl:when test="string(number(desc_strokewidth/text()))='NaN'">2</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="number(desc_strokewidth) &gt; 0"><xsl:value-of select="round(number(desc_strokewidth/text()))"/></xsl:when>
					<xsl:otherwise>2</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="full.angle">
		<xsl:choose>
			<xsl:when test="string(number(desc_angle/text()))='NaN'">0</xsl:when>
			<xsl:otherwise><xsl:value-of select="desc_angle/text()"/></xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="full.radius">
		<xsl:choose>
			<xsl:when test="string(number(desc_arcsize/text()))='NaN'">
				<xsl:choose>
					<xsl:when test="number($full.width) &gt; number($full.height)"><xsl:value-of select="round(0.025*number($full.height))"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="round(0.025*number($full.width))"/></xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="number($full.width) &gt; number($full.height)"><xsl:value-of select="round(number(desc_arcsize/text())*number($full.height))"/></xsl:when>
					<xsl:otherwise><xsl:value-of select="round(number(desc_arcsize/text())*number($full.width))"/></xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<xsl:variable name="full.unit.x" select="10000 div number($full.width)"/>
	<xsl:variable name="full.unit.y" select="10000 div number($full.height)"/>
	<xsl:variable name="full.radius.x" select="round(number($full.radius)*number($full.unit.x))"/>
	<xsl:variable name="full.radius.y" select="round(number($full.radius)*number($full.unit.y))"/>
	<xsl:variable name="full.x0" select="0"/>
	<xsl:variable name="full.x1" select="number($full.radius.x)"/>
	<xsl:variable name="full.x2" select="10000 - number($full.radius.x)"/>
	<xsl:variable name="full.x3" select="10000"/>
	<xsl:variable name="full.y0" select="0"/>
	<xsl:variable name="full.y1" select="number($full.radius.y)"/>
	<xsl:variable name="full.y2" select="10000 - number($full.radius.y)"/>
	<xsl:variable name="full.y3" select="10000"/>
	<xsl:variable name="full.path">M<xsl:value-of select="$full.x0"/>,<xsl:value-of select="$full.y1"/> QY<xsl:value-of select="$full.x1"/>,<xsl:value-of select="$full.y0"/> L<xsl:value-of select="$full.x2"/>,<xsl:value-of select="$full.y0"/> QX<xsl:value-of select="$full.x3"/>,<xsl:value-of select="$full.y1"/> L<xsl:value-of select="$full.x3"/>,<xsl:value-of select="$full.y2"/> QY<xsl:value-of select="$full.x2"/>,<xsl:value-of select="$full.y3"/> L<xsl:value-of select="$full.x1"/>,<xsl:value-of select="$full.y3"/> QX<xsl:value-of select="$full.x0"/>,<xsl:value-of select="$full.y2"/> XE</xsl:variable>
	<xsl:variable name="full.gradient.moz">90deg, <xsl:value-of select="$desc.color1"/>, <xsl:value-of select="$desc.color2"/></xsl:variable>
	<xsl:variable name="full.gradient.opera">90deg, <xsl:value-of select="$desc.color1"/>, <xsl:value-of select="$desc.color2"/></xsl:variable>
	<xsl:variable name="full.gradient.webkit">linear, 50% 100%, 50% 0%, from(<xsl:value-of select="$desc.color1"/>), to(<xsl:value-of select="$desc.color2"/>)</xsl:variable>
	<xsl:variable name="full.shadow.offset" select="round(0.5*number($full.strokewidth) + 3)"/>
	
	<xsl:variable name="p_trans" select="pointer_transition/text()"/>
	<xsl:variable name="pointer.radius" select="round(0.5*number($pointer.height))"/>
	<xsl:variable name="pointer.strokewidth" select="strokewidth"/>
	<xsl:variable name="pointer.gradient.moz">90deg, <xsl:value-of select="$pointer.color1"/>, <xsl:value-of select="$pointer.color2"/></xsl:variable>
	<xsl:variable name="pointer.gradient.moz.over">90deg, <xsl:value-of select="$pointer.color1.over"/>, <xsl:value-of select="$pointer.color2.over"/></xsl:variable>
	<xsl:variable name="pointer.gradient.moz.selected">90deg, <xsl:value-of select="$pointer.color1.selected"/>, <xsl:value-of select="$pointer.color2.selected"/></xsl:variable>
	<xsl:variable name="pointer.gradient.opera">90deg, <xsl:value-of select="$pointer.color1"/>, <xsl:value-of select="$pointer.color2"/></xsl:variable>
	<xsl:variable name="pointer.gradient.opera.over">90deg, <xsl:value-of select="$pointer.color1.over"/>, <xsl:value-of select="$pointer.color2.over"/></xsl:variable>
	<xsl:variable name="pointer.gradient.opera.selected">90deg, <xsl:value-of select="$pointer.color1.selected"/>, <xsl:value-of select="$pointer.color2.selected"/></xsl:variable>
	<xsl:variable name="pointer.gradient.webkit">linear, 50% 100%, 50% 0%, from(<xsl:value-of select="$pointer.color1"/>), to(<xsl:value-of select="$pointer.color2"/>)</xsl:variable>
	<xsl:variable name="pointer.gradient.webkit.over">linear, 50% 100%, 50% 0%, from(<xsl:value-of select="$pointer.color1.over"/>), to(<xsl:value-of select="$pointer.color2.over"/>)</xsl:variable>
	<xsl:variable name="pointer.gradient.webkit.selected">linear, 50% 100%, 50% 0%, from(<xsl:value-of select="$pointer.color1.selected"/>), to(<xsl:value-of select="$pointer.color2.selected"/>)</xsl:variable>
	
	<div>
		<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_CONTAINER</xsl:attribute>
		<xsl:attribute name="style">position: absolute; top: 0px; left: 0px; width: <xsl:value-of select="$width"/>px; height: <xsl:value-of select="$height"/>px;</xsl:attribute>
		<div>
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL</xsl:attribute>
			<xsl:attribute name="style">position: absolute; visibility: hidden; left: <xsl:value-of select="$desc.left"/>px; top: <xsl:value-of select="$desc.top"/>px; width: <xsl:value-of select="$desc.width"/>px; height: <xsl:value-of select="$desc.height"/>px; <xsl:if test="transition_type!='none'">filter:revealtrans(duration=<xsl:value-of select="transition_duration"/>, transition=<xsl:value-of select="transition_type"/>);</xsl:if></xsl:attribute>
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL_VML</xsl:attribute>
				<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$desc.width"/>px; height: <xsl:value-of select="$desc.height"/>px;</xsl:attribute>
				<v:shape>
					<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL_shape</xsl:attribute>
					<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$desc.width"/>px; height: <xsl:value-of select="$desc.height"/>px;</xsl:attribute>
					<xsl:attribute name="coordsize">10000,10000</xsl:attribute>
					<xsl:attribute name="filled">t</xsl:attribute>
					<xsl:attribute name="fillcolor"><xsl:value-of select="$desc.color1"/></xsl:attribute>
					<xsl:attribute name="stroked">t</xsl:attribute>
					<xsl:attribute name="strokecolor"><xsl:value-of select="$desc.strokecolor"/></xsl:attribute>
					<xsl:attribute name="strokeweight"><xsl:value-of select="$full.strokewidth"/>px</xsl:attribute>
					<xsl:attribute name="path"><xsl:value-of select="$full.path"/></xsl:attribute>
					<v:fill>
						<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL_FILL</xsl:attribute>
						<xsl:attribute name="type">gradient</xsl:attribute>
						<xsl:attribute name="color"><xsl:value-of select="$desc.color1"/></xsl:attribute>
						<xsl:attribute name="color2"><xsl:value-of select="$desc.color2"/></xsl:attribute>
						<xsl:attribute name="angle"><xsl:value-of select="$full.angle"/></xsl:attribute>
					</v:fill>
					<v:shadow on="true" obscured="true" opacity="0.8">
						<xsl:attribute name="color">#666666</xsl:attribute>
						<xsl:attribute name="offset"><xsl:value-of select="$full.shadow.offset"/>px,<xsl:value-of select="$full.shadow.offset"/>px</xsl:attribute>
					</v:shadow>
				</v:shape>
			</div>
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL_W3C</xsl:attribute>	
				<xsl:attribute name="style">position: absolute; top: 0px; left: 0px; width: <xsl:value-of select="number($desc.width) - number($full.strokewidth)"/>px; height: <xsl:value-of select="number($desc.height) - number($full.strokewidth)"/>px; font-size: 1px;
					-moz-box-shadow: 2px 2px 6px #666666; -webkit-box-shadow: 2px 2px 6px #666666; box-shadow: 2px 2px 6px #666666;
					-moz-border-radius: <xsl:value-of select="$full.radius"/>px; -webkit-border-radius: <xsl:value-of select="$full.radius"/>px; -khtml-border-radius: <xsl:value-of select="$full.radius"/>px; border-radius: <xsl:value-of select="$full.radius"/>px; border: solid <xsl:value-of select="$full.strokewidth"/>px <xsl:value-of select="$desc.strokecolor"/>;
					background-color: <xsl:value-of select="$desc.color1"/>; background-image: -webkit-gradient(<xsl:value-of select="$full.gradient.webkit"/>); background-image: -moz-linear-gradient(<xsl:value-of select="$full.gradient.moz"/>); background-image: -o-linear-gradient(<xsl:value-of select="$full.gradient.opera"/>);
				</xsl:attribute>
				&#160;
			</div>
			<div>
				<xsl:attribute name="style">position: absolute; top: 12px; left: 12px; width: <xsl:value-of select="number($desc.width) - 24"/>px; height: <xsl:value-of select="number($desc.height) - 24"/>px; overflow: auto; text-align: center;</xsl:attribute>
				<table cellpadding="0" cellspacing="0" border="0">
					<xsl:attribute name="style">width: <xsl:value-of select="number($desc.width) - 24"/>px; height: <xsl:value-of select="number($desc.height) - 24"/>px;</xsl:attribute>
					<tr>
						<td>
							<div>
								<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_FULL_TXT</xsl:attribute>
								<xsl:value-of select="full_desc" disable-output-escaping="yes"/>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<xsl:if test="display_method='overclick'">
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT</xsl:attribute>
				<xsl:attribute name="style">position: absolute; visibility: hidden; left: <xsl:value-of select="$short.left"/>px; top: <xsl:value-of select="$short.top"/>px; width: <xsl:value-of select="$short.width"/>px; height: <xsl:value-of select="$short.height"/>px; <xsl:if test="short_transition_type!='none'">filter:revealtrans(duration=<xsl:value-of select="short_transition_duration"/>, transition=<xsl:value-of select="short_transition_type"/>);</xsl:if></xsl:attribute>
				<div>
					<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT_VML</xsl:attribute>
					<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$short.width"/>px; height: <xsl:value-of select="$short.height"/>px;</xsl:attribute>
					<v:shape>
						<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT_shape</xsl:attribute>
						<xsl:attribute name="radius"><xsl:value-of select="$short.radius"/></xsl:attribute>
						<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$short.width"/>px; height: <xsl:value-of select="$short.height"/>px;</xsl:attribute>
						<xsl:attribute name="coordsize">10000,10000</xsl:attribute>
						<xsl:attribute name="filled">t</xsl:attribute>
						<xsl:attribute name="fillcolor"><xsl:value-of select="$short.color1"/></xsl:attribute>
						<xsl:attribute name="stroked">t</xsl:attribute>
						<xsl:attribute name="strokecolor"><xsl:value-of select="$short.strokecolor"/></xsl:attribute>
						<xsl:attribute name="strokeweight"><xsl:value-of select="$short.strokewidth"/>px</xsl:attribute>
						<xsl:attribute name="path"><xsl:value-of select="$short.path"/></xsl:attribute>
						<v:fill>
							<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT_FILL</xsl:attribute>
							<xsl:attribute name="type">gradient</xsl:attribute>
							<xsl:attribute name="color"><xsl:value-of select="$short.color1"/></xsl:attribute>
							<xsl:attribute name="color2"><xsl:value-of select="$short.color2"/></xsl:attribute>
							<xsl:attribute name="focusposition">.5,.5</xsl:attribute>
							<xsl:attribute name="focussize">0,0</xsl:attribute>
							<xsl:attribute name="angle"><xsl:value-of select="short_desc_angle"/></xsl:attribute>
						</v:fill>
						<v:shadow on="true" obscured="true" opacity="0.8">
							<xsl:attribute name="color">#666666</xsl:attribute>
							<xsl:attribute name="offset"><xsl:value-of select="$short.shadow.offset"/>px,<xsl:value-of select="$short.shadow.offset"/>px</xsl:attribute>
						</v:shadow>
					</v:shape>
				</div>
				<div>
					<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT_W3C</xsl:attribute>	
					<xsl:attribute name="style">position: absolute; top: 0px; left: 0px; width: <xsl:value-of select="number($short.width) - number($short.strokewidth)"/>px; height: <xsl:value-of select="number($short.height) - number($short.strokewidth)"/>px; font-size: 1px;
						-moz-box-shadow: 2px 2px 6px #666666; -webkit-box-shadow: 2px 2px 6px #666666; box-shadow: 2px 2px 6px #666666;
						-moz-border-radius: <xsl:value-of select="$short.radius"/>px; -webkit-border-radius: <xsl:value-of select="$short.radius"/>px; -khtml-border-radius: <xsl:value-of select="$short.radius"/>px; border-radius: <xsl:value-of select="$short.radius"/>px; border: solid <xsl:value-of select="$short.strokewidth"/>px <xsl:value-of select="$short.strokecolor"/>;
						background-color: <xsl:value-of select="$short.color1"/>; background-image: -webkit-gradient(<xsl:value-of select="$short.gradient.webkit"/>); background-image: -moz-linear-gradient(<xsl:value-of select="$short.gradient.moz"/>); background-image: -o-linear-gradient(<xsl:value-of select="$short.gradient.opera"/>);
					</xsl:attribute>
					&#160;
				</div>
				<div>
					<xsl:attribute name="style">position: absolute; top: 12px; left: 12px; width: <xsl:value-of select="number($short.width) - 24"/>px; text-align: center;</xsl:attribute>
					<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_SHORT_TXT</xsl:attribute>
					<xsl:value-of select="short_desc" disable-output-escaping="yes"/>
				</div>
			</div>
		</xsl:if>
		<div>
			<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER</xsl:attribute>
			<xsl:attribute name="style">position: absolute; visibility: hidden; left: <xsl:value-of select="$pointer.left"/>px; top: <xsl:value-of select="$pointer.top"/>px; width: <xsl:value-of select="$pointer.width"/>px; height: <xsl:value-of select="$pointer.height"/>px;
				<xsl:if test="display_method!='method'">cursor: pointer;</xsl:if> 
				<xsl:if test="$p_trans!='none'">filter: <xsl:value-of select="$filter"/>;</xsl:if>
			</xsl:attribute>
			<xsl:attribute name="clip-idle">rect(<xsl:value-of select="number($pointer.top)-2"/>px, <xsl:value-of select="round(number($pointer.left) + 1.5*number($pointer.width))"/>px, <xsl:value-of select="round(number($pointer.top) + 1.5*number($pointer.height))"/>px, <xsl:value-of select="number($pointer.left)-2"/>px)</xsl:attribute>
			<xsl:attribute name="clip-full">auto</xsl:attribute>
			<xsl:attribute name="angle-idle"><xsl:value-of select="angle"/></xsl:attribute>
			<xsl:attribute name="angle-over"><xsl:value-of select="angle_over"/></xsl:attribute>
			<xsl:attribute name="angle-selected"><xsl:value-of select="angle_selected"/></xsl:attribute>
			<xsl:attribute name="color-idle"><xsl:value-of select="$pointer.color1"/></xsl:attribute>
			<xsl:attribute name="color-over"><xsl:value-of select="$pointer.color1.over"/></xsl:attribute>
			<xsl:attribute name="color-selected"><xsl:value-of select="$pointer.color1.selected"/></xsl:attribute>
			<xsl:attribute name="color2-idle"><xsl:value-of select="$pointer.color2"/></xsl:attribute>
			<xsl:attribute name="color2-over"><xsl:value-of select="$pointer.color2.over"/></xsl:attribute>
			<xsl:attribute name="color2-selected"><xsl:value-of select="$pointer.color2.selected"/></xsl:attribute>
			<xsl:attribute name="strokecolor-idle"><xsl:value-of select="$pointer.strokecolor"/></xsl:attribute>
			<xsl:attribute name="strokecolor-over"><xsl:value-of select="$pointer.strokecolor.over"/></xsl:attribute>
			<xsl:attribute name="strokecolor-selected"><xsl:value-of select="$pointer.strokecolor.selected"/></xsl:attribute>
			<xsl:attribute name="strokeweight"><xsl:value-of select="strokewidth"/>px</xsl:attribute>
			<xsl:attribute name="strokeweight-idle"><xsl:value-of select="strokewidth"/>px</xsl:attribute>
			<xsl:attribute name="strokeweight-over"><xsl:value-of select="strokewidth_over"/>px</xsl:attribute>
			<xsl:attribute name="strokeweight-selected"><xsl:value-of select="strokewidth_selected"/>px</xsl:attribute>
			<xsl:attribute name="fontcolor-idle"><xsl:value-of select="$pointer.fontcolor"/></xsl:attribute>
			<xsl:attribute name="fontcolor-over"><xsl:value-of select="$pointer.fontcolor.over"/></xsl:attribute>
			<xsl:attribute name="fontcolor-selected"><xsl:value-of select="$pointer.fontcolor.selected"/></xsl:attribute>
			<xsl:attribute name="fontfamily-idle"><xsl:value-of select="$pointer.fontfamily"/></xsl:attribute>
			<xsl:attribute name="fontfamily-over"><xsl:value-of select="$pointer.fontfamily.over"/></xsl:attribute>
			<xsl:attribute name="fontfamily-selected"><xsl:value-of select="$pointer.fontfamily.selected"/></xsl:attribute>
			<xsl:attribute name="fontsize-idle"><xsl:value-of select="font_size"/></xsl:attribute>
			<xsl:attribute name="fontsize-over"><xsl:value-of select="font_size_over"/></xsl:attribute>
			<xsl:attribute name="fontsize-selected"><xsl:value-of select="font_size_selected"/></xsl:attribute>
			<xsl:attribute name="fontstyle-idle"><xsl:value-of select="font_style"/></xsl:attribute>
			<xsl:attribute name="fontstyle-over"><xsl:value-of select="font_style_over"/></xsl:attribute>
			<xsl:attribute name="fontstyle-selected"><xsl:value-of select="font_style_selected"/></xsl:attribute>
			<xsl:attribute name="fontweight-idle"><xsl:value-of select="font_weight"/></xsl:attribute>
			<xsl:attribute name="fontweight-over"><xsl:value-of select="font_weight_over"/></xsl:attribute>
			<xsl:attribute name="fontweight-selected"><xsl:value-of select="font_weight_selected"/></xsl:attribute>
			<xsl:attribute name="moz-gradient-idle">-moz-linear-gradient(<xsl:value-of select="$pointer.gradient.moz"/>)</xsl:attribute>
			<xsl:attribute name="moz-gradient-over">-moz-linear-gradient(<xsl:value-of select="$pointer.gradient.moz.over"/>)</xsl:attribute>
			<xsl:attribute name="moz-gradient-selected">-moz-linear-gradient(<xsl:value-of select="$pointer.gradient.moz.selected"/>)</xsl:attribute>
			<xsl:attribute name="webkit-gradient-idle">-webkit-gradient(<xsl:value-of select="$pointer.gradient.webkit"/>)</xsl:attribute>
			<xsl:attribute name="webkit-gradient-over">-webkit-gradient(<xsl:value-of select="$pointer.gradient.webkit.over"/>)</xsl:attribute>
			<xsl:attribute name="webkit-gradient-selected">-webkit-gradient(<xsl:value-of select="$pointer.gradient.webkit.selected"/>)</xsl:attribute>
			<xsl:attribute name="o-gradient-idle">-o-linear-gradient(<xsl:value-of select="$pointer.gradient.opera"/>)</xsl:attribute>
			<xsl:attribute name="o-gradient-over">-o-linear-gradient(<xsl:value-of select="$pointer.gradient.opera.over"/>)</xsl:attribute>
			<xsl:attribute name="o-gradient-selected">-o-linear-gradient(<xsl:value-of select="$pointer.gradient.opera.selected"/>)</xsl:attribute>
			<xsl:attribute name="onmouseover">CallMethod('<xsl:value-of select="$object.template"/>', 'Over', { pid: '<xsl:value-of select="$objectID"/>', elem: this }); return false;</xsl:attribute>
			<xsl:attribute name="onmouseout">CallMethod('<xsl:value-of select="$object.template"/>', 'Out', { pid: '<xsl:value-of select="$objectID"/>', elem: this }); return false;</xsl:attribute>
			<xsl:attribute name="onclick">CallMethod('<xsl:value-of select="$object.template"/>', 'Click', { pid: '<xsl:value-of select="$objectID"/>', elem: this }); return false;</xsl:attribute>
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_VML</xsl:attribute>
				<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$pointer.width"/>px; height: <xsl:value-of select="$pointer.height"/>px;</xsl:attribute>
				<v:oval>
					<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_shape</xsl:attribute>
					<xsl:attribute name="style">position: absolute; left: 0px; top: 0px; width: <xsl:value-of select="$pointer.width"/>px; height: <xsl:value-of select="$pointer.height"/>px;</xsl:attribute>
					<xsl:attribute name="curfilter">0</xsl:attribute>
					<xsl:attribute name="filled">t</xsl:attribute>
					<xsl:attribute name="fillcolor"><xsl:value-of select="$pointer.color1"/></xsl:attribute>
					<xsl:attribute name="stroked">t</xsl:attribute>
					<xsl:attribute name="strokecolor"><xsl:value-of select="$pointer.strokecolor"/></xsl:attribute>
					<v:fill>
						<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_FILL</xsl:attribute>
						<xsl:attribute name="type">gradient</xsl:attribute>
						<xsl:attribute name="color"><xsl:value-of select="$pointer.color1"/></xsl:attribute>
						<xsl:attribute name="color2"><xsl:value-of select="$pointer.color2"/></xsl:attribute>
						<xsl:attribute name="angle">0</xsl:attribute>
					</v:fill>
					<v:shadow on="true" obscured="true" opacity="0.8">
						<xsl:attribute name="color">#666666</xsl:attribute>
						<xsl:attribute name="offset">2px,2px</xsl:attribute>
					</v:shadow>
				</v:oval>
			</div>
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_W3C</xsl:attribute>
				<xsl:attribute name="style">position: absolute; top: 0px; left: 0px; width: <xsl:value-of select="number($pointer.width) - number($pointer.strokewidth)"/>px; height: <xsl:value-of select="number($pointer.height) - number($pointer.strokewidth)"/>px; font-size: 1px;
					-moz-box-shadow: 2px 2px 6px #666666; -webkit-box-shadow: 2px 2px 6px #666666; box-shadow: 2px 2px 6px #666666;
					-moz-border-radius: <xsl:value-of select="$pointer.radius"/>px; -webkit-border-radius: <xsl:value-of select="$pointer.radius"/>px; -khtml-border-radius: <xsl:value-of select="$pointer.radius"/>px; border-radius: <xsl:value-of select="$pointer.radius"/>px; border: solid <xsl:value-of select="$pointer.strokewidth"/>px <xsl:value-of select="$pointer.strokecolor"/>;
					background-color: <xsl:value-of select="$pointer.color1"/>; background-image: -webkit-gradient(<xsl:value-of select="$pointer.gradient.webkit"/>); background-image: -moz-linear-gradient(<xsl:value-of select="$pointer.gradient.moz"/>); background-image: -o-linear-gradient(<xsl:value-of select="$pointer.gradient.opera"/>);
				</xsl:attribute>
				&#160;
			</div>
			<div>
				<xsl:attribute name="style">position: absolute; top: 1px; left: 1px; width: <xsl:value-of select="$pointer.width"/>px; height: <xsl:value-of select="$pointer.height"/>px; overflow: hidden; text-align: center;</xsl:attribute>
				<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td align="center" valign="middle">
							<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_TXT</xsl:attribute>
							<xsl:attribute name="style">font-family: <xsl:value-of select="$pointer.fontfamily"/>; font-size: <xsl:value-of select="font_size"/>px; font-weight: <xsl:value-of select="font_weight"/>; font-style: <xsl:value-of select="font_style"/>; color: <xsl:value-of select="$pointer.fontcolor"/>;</xsl:attribute>
							<xsl:value-of select="pointer_text"/>
						</td>
					</tr>
				</table>
			</div>
			<div>
				<xsl:attribute name="id"><xsl:value-of select="$objectID"/>_POINTER_MASK</xsl:attribute>
				<xsl:attribute name="style">position: absolute; top: 0px; left: 0px; width: <xsl:value-of select="$pointer.width"/>px; height: <xsl:value-of select="$pointer.height"/>px; overflow: hidden; font-family: monospace; font-size: <xsl:value-of select="$pointer.height"/>px;</xsl:attribute>
				&#160;&#160;<br/>&#160;&#160;
			</div>
		</div>
	</div>
	<v:group/>

</xsl:template>
</xsl:stylesheet>
