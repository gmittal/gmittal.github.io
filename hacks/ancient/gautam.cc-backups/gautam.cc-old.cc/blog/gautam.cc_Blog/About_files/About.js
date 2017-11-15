// Created by iWeb 3.0.4 local-build-20120528

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-4,4,8,135),url:'About_files/stroke.png'},{rect:new IWRect(-4,-4,8,8),url:'About_files/stroke_1.png'},{rect:new IWRect(4,-4,192,8),url:'About_files/stroke_2.png'},{rect:new IWRect(196,-4,8,8),url:'About_files/stroke_3.png'},{rect:new IWRect(196,4,8,135),url:'About_files/stroke_4.png'},{rect:new IWRect(196,139,8,8),url:'About_files/stroke_5.png'},{rect:new IWRect(4,139,192,8),url:'About_files/stroke_6.png'},{rect:new IWRect(-4,139,8,8),url:'About_files/stroke_7.png'}],new IWSize(200,143)),stroke_1:new IWPhotoFrame([IWCreateImage('About_files/receipt_top_01.png'),IWCreateImage('About_files/receipt_top_02.png'),IWCreateImage('About_files/receipt_top_03.png'),IWCreateImage('About_files/receipt_side_02.png'),IWCreateImage('About_files/receipt_bottom_03.png'),IWCreateImage('About_files/receipt_bottom_02.png'),IWCreateImage('About_files/receipt_bottom_01.png'),IWCreateImage('About_files/receipt_side_01.png')],null,2,1.000000,0.000000,2.000000,0.000000,8.000000,1.000000,9.000000,1.000000,41.000000,1.000000,275.000000,1.000000,275.000000,null,null,null,0.500000),shadow_0:new IWShadow({blurRadius:1,offset:new IWPoint(1.4142,1.4142),color:'#000000',opacity:0.440000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('About_files/AboutMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();applyEffects()}
function onPageUnload()
{Widget.onunload();}
