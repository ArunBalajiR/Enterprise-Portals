//nodemon serve
//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const xml2js = require('xml2js');
const convert = require('xml-js');
const { response } = require('express');
var unirest = require('unirest');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Headers","Origin,X-Requested-with,Content-Type,Accept");
 next();
});

//Config .env
require('dotenv').config();


var rest = {};
const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.send("API IS UP AND RUNNING !!");
});

//-----CUSTOMER PORTAL-------------

// LOGIN
app.post('/login',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var loginBody = `<?xml version="1.0" encoding="UTF-8"?><ns0:ZCUSTOMERLOGIN_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSTOMERID>${id}</CUSTOMERID><PASSWORD>${pwd}</PASSWORD></ns0:ZCUSTOMERLOGIN_FM>`;
  console.log("Customer Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/loginbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(loginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else if(result.body.STATUS == 'INVALID'){
      console.log('Unable to fetch Customer Login data');
      res.json({ success : false, message : "Check your credentials once"});
    }
    else{
      res.status(200).json({success : true, message : "User Authenticated Successfully", data: result.body});
    }

  })

});

// profile
app.post('/profile',(req,res)=>{
  let id = req.body.id;
  var profileBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCUSTOMERPROFILE_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <CUSTOMERID>${id}</CUSTOMERID>
  </ns0:ZCUSTOMERPROFILE_FM>`;
  console.log("Customer Profile Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getprofilebyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(profileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer Profile data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.PROFILE['KUNNR'] === ''){
      console.log('Unable to fetch Customer profile data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});


// SALE ORDER
app.post('/saleorder',(req,res)=>{
  let id = req.body.id;
  var saleorderBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCUSTOMERSALEORDER_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <CUSTOMERID>${id}</CUSTOMERID>
     <SALESORG>0001</SALESORG>
  </ns0:ZCUSTOMERSALEORDER_FM>`;
  console.log("Saleorder Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getsaleorderbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(saleorderBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.RESULT['TYPE'] === 'E'){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//CREDIT
app.post('/creditdebitmemo',(req,res)=>{
  let id = req.body.id;
  var creditdebitBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCUSTOMERCREDIT_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <CUSTOMERID>${id}</CUSTOMERID>
  </ns0:ZCUSTOMERCREDIT_FM>`;
  console.log("Credit Debit Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getcreditbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(creditdebitBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.CREDITRETURN === 'FAIL' && result.body.DEBITRETURN === 'FAIL'){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//DELIVERY LIST
app.post('/deliverylist',(req,res)=>{
  let id = req.body.id;
  var deliverylistBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCUSTOMERDELIVERYLIST_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <CUSTOMERID>${id}</CUSTOMERID>
     <DELIVERYDATA>
        <item>
           <VBELN/>
           <ERZET/>
           <ERDAT/>
           <VKORG/>
           <LFART/>
           <LFDAT_V/>
           <INCO2/>
           <ARKTX/>
           <LFUHR/>
        </item>
     </DELIVERYDATA>
  </ns0:ZCUSTOMERDELIVERYLIST_FM>`;
  console.log("Deliverylist Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getdeliverylistbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(deliverylistBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else if(result.body.DELIVERYDATA['item'].length === undefined){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//delivery detail

//INQUIRY LIST
app.post('/inquirylist',(req,res)=>{
  let id = req.body.id;
  var inquirylistBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCUSTOMERENQLIST_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <CUSTOMERID>${id}</CUSTOMERID>
  </ns0:ZCUSTOMERENQLIST_FM>`;
  console.log("Inquirylist Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getinqlistbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(inquirylistBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.INQUIRYLIST === ""){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//INQUIRY DETAIL

//PAYMENT(COPY)
app.post('/payment',(req,res)=>{
  let id = req.body.id;
  var paymentBody = `<?xml version="1.0" encoding="UTF-8"?> <ns0:ZFM_PAYMENT_AGING_TT xmlns:ns0="urn:sap-com:document:sap:rfc:functions"> <I_COMCODE>0001</I_COMCODE> <I_CUSID>${id}</I_CUSID> <I_DOCDATE/> <IT_DET> <item> <COMP_CODE/> <CUSTOMER/> <SP_GL_IND/> <CLEAR_DATE/> <CLR_DOC_NO/> <ALLOC_NMBR/> <FISC_YEAR/> <DOC_NO/> <ITEM_NUM/> <PSTNG_DATE/> <DOC_DATE/> <ENTRY_DATE/> <CURRENCY/> <LOC_CURRCY/> <REF_DOC_NO/> <DOC_TYPE/> <FIS_PERIOD/> <POST_KEY/> <DB_CR_IND/> <BUS_AREA/> <TAX_CODE/> <LC_AMOUNT/> <AMT_DOCCUR/> <LC_TAX/> <TX_DOC_CUR/> <ITEM_TEXT/> <BRANCH/> <BLINE_DATE/> <PMNTTRMS/> <DSCT_DAYS1/> <DSCT_DAYS2/> <NETTERMS/> <DSCT_PCT1/> <DSCT_PCT2/> <DISC_BASE/> <DSC_AMT_LC/> <DSC_AMT_DC/> <PYMT_METH/> <PMNT_BLOCK/> <FIXEDTERMS/> <INV_REF/> <INV_YEAR/> <INV_ITEM/> <DUNN_BLOCK/> <DUNN_KEY/> <LAST_DUNN/> <DUNN_LEVEL/> <DUNN_AREA/> <DOC_STATUS/> <NXT_DOCTYP/> <VAT_REG_NO/> <REASON_CDE/> <PMTMTHSUPL/> <REF_KEY_1/> <REF_KEY_2/> <T_CURRENCY/> <AMOUNT/> <NET_AMOUNT/> <NAME/> <NAME_2/> <NAME_3/> <NAME_4/> <POSTL_CODE/> <CITY/> <COUNTRY/> <STREET/> <PO_BOX/> <POBX_PCD/> <POBK_CURAC/> <BANK_ACCT/> <BANK_KEY/> <BANK_CTRY/> <TAX_NO_1/> <TAX_NO_2/> <TAX/> <EQUAL_TAX/> <REGION/> <CTRL_KEY/> <INSTR_KEY/> <PAYEE_CODE/> <LANGU/> <BILL_LIFE/> <BE_TAXCODE/> <BILLTAX_LC/> <BILLTAX_FC/> <LC_COL_CHG/> <COLL_CHARG/> <CHGS_TX_CD/> <ISSUE_DATE/> <USAGEDATE/> <BILL_USAGE/> <DOMICILE/> <DRAWER/> <CTRBNK_LOC/> <DRAW_CITY1/> <DRAWEE/> <DRAW_CITY2/> <DISCT_DAYS/> <DISCT_RATE/> <ACCEPTED/> <BILLSTATUS/> <PRTEST_IND/> <BE_DEMAND/> <OBJ_TYPE/> <REF_DOC/> <REF_ORG_UN/> <REVERSAL_DOC/> <SP_GL_TYPE/> <NEG_POSTNG/> <REF_DOC_NO_LONG/> <BILL_DOC/> </item> </IT_DET> </ns0:ZFM_PAYMENT_AGING_TT>`;
  console.log("Payment Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/paymenttt')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(paymentBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.IT_DET === ""){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});


//INVOICE(COPY)
app.post('/invoice',(req,res)=>{
  let id = req.body.id;
  var invoiceBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZFM_CUST_INV_TT xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
      <CUS_ID>${id}</CUS_ID>
      <SALES_DOC_NO></SALES_DOC_NO>
      <INV_DET>
          <item>
              <MANDT/>
              <BUKRS/>
              <BELNR/>
              <GJAHR/>
              <BUZEI/>
              <BUZID/>
              <AUGDT/>
              <AUGCP/>
              <AUGBL/>
              <BSCHL/>
              <KOART/>
              <UMSKZ/>
              <UMSKS/>
              <ZUMSK/>
              <SHKZG/>
              <GSBER/>
              <PARGB/>
              <MWSKZ/>
              <QSSKZ/>
              <DMBTR/>
              <WRBTR/>
              <KZBTR/>
              <PSWBT/>
              <PSWSL/>
              <TXBHW/>
              <TXBFW/>
              <MWSTS/>
              <WMWST/>
              <HWBAS/>
              <FWBAS/>
              <HWZUZ/>
              <FWZUZ/>
              <SHZUZ/>
              <STEKZ/>
              <MWART/>
              <TXGRP/>
              <KTOSL/>
              <QSSHB/>
              <KURSR/>
              <GBETR/>
              <BDIFF/>
              <BDIF2/>
              <VALUT/>
              <ZUONR/>
              <SGTXT/>
              <ZINKZ/>
              <VBUND/>
              <BEWAR/>
              <ALTKT/>
              <VORGN/>
              <FDLEV/>
              <FDGRP/>
              <FDWBT/>
              <FDTAG/>
              <FKONT/>
              <KOKRS/>
              <KOSTL/>
              <PROJN/>
              <AUFNR/>
              <VBELN/>
              <VBEL2/>
              <POSN2/>
              <ETEN2/>
              <ANLN1/>
              <ANLN2/>
              <ANBWA/>
              <BZDAT/>
              <PERNR/>
              <XUMSW/>
              <XHRES/>
              <XKRES/>
              <XOPVW/>
              <XCPDD/>
              <XSKST/>
              <XSAUF/>
              <XSPRO/>
              <XSERG/>
              <XFAKT/>
              <XUMAN/>
              <XANET/>
              <XSKRL/>
              <XINVE/>
              <XPANZ/>
              <XAUTO/>
              <XNCOP/>
              <XZAHL/>
              <SAKNR/>
              <HKONT/>
              <KUNNR/>
              <LIFNR/>
              <FILKD/>
              <XBILK/>
              <GVTYP/>
              <HZUON/>
              <ZFBDT/>
              <ZTERM/>
              <ZBD1T/>
              <ZBD2T/>
              <ZBD3T/>
              <ZBD1P/>
              <ZBD2P/>
              <SKFBT/>
              <SKNTO/>
              <WSKTO/>
              <ZLSCH/>
              <ZLSPR/>
              <ZBFIX/>
              <HBKID/>
              <BVTYP/>
              <NEBTR/>
              <MWSK1/>
              <DMBT1/>
              <WRBT1/>
              <MWSK2/>
              <DMBT2/>
              <WRBT2/>
              <MWSK3/>
              <DMBT3/>
              <WRBT3/>
              <REBZG/>
              <REBZJ/>
              <REBZZ/>
              <REBZT/>
              <ZOLLT/>
              <ZOLLD/>
              <LZBKZ/>
              <LANDL/>
              <DIEKZ/>
              <SAMNR/>
              <ABPER/>
              <VRSKZ/>
              <VRSDT/>
              <DISBN/>
              <DISBJ/>
              <DISBZ/>
              <WVERW/>
              <ANFBN/>
              <ANFBJ/>
              <ANFBU/>
              <ANFAE/>
              <BLNBT/>
              <BLNKZ/>
              <BLNPZ/>
              <MSCHL/>
              <MANSP/>
              <MADAT/>
              <MANST/>
              <MABER/>
              <ESRNR/>
              <ESRRE/>
              <ESRPZ/>
              <KLIBT/>
              <QSZNR/>
              <QBSHB/>
              <QSFBT/>
              <NAVHW/>
              <NAVFW/>
              <MATNR/>
              <WERKS/>
              <MENGE/>
              <MEINS/>
              <ERFMG/>
              <ERFME/>
              <BPMNG/>
              <BPRME/>
              <EBELN/>
              <EBELP/>
              <ZEKKN/>
              <ELIKZ/>
              <VPRSV/>
              <PEINH/>
              <BWKEY/>
              <BWTAR/>
              <BUSTW/>
              <REWRT/>
              <REWWR/>
              <BONFB/>
              <BUALT/>
              <PSALT/>
              <NPREI/>
              <TBTKZ/>
              <SPGRP/>
              <SPGRM/>
              <SPGRT/>
              <SPGRG/>
              <SPGRV/>
              <SPGRQ/>
              <STCEG/>
              <EGBLD/>
              <EGLLD/>
              <RSTGR/>
              <RYACQ/>
              <RPACQ/>
              <RDIFF/>
              <RDIF2/>
              <PRCTR/>
              <XHKOM/>
              <VNAME/>
              <RECID/>
              <EGRUP/>
              <VPTNR/>
              <VERTT/>
              <VERTN/>
              <VBEWA/>
              <DEPOT/>
              <TXJCD/>
              <IMKEY/>
              <DABRZ/>
              <POPTS/>
              <FIPOS/>
              <KSTRG/>
              <NPLNR/>
              <AUFPL/>
              <APLZL/>
              <PROJK/>
              <PAOBJNR/>
              <PASUBNR/>
              <SPGRS/>
              <SPGRC/>
              <BTYPE/>
              <ETYPE/>
              <XEGDR/>
              <LNRAN/>
              <HRKFT/>
              <DMBE2/>
              <DMBE3/>
              <DMB21/>
              <DMB22/>
              <DMB23/>
              <DMB31/>
              <DMB32/>
              <DMB33/>
              <MWST2/>
              <MWST3/>
              <NAVH2/>
              <NAVH3/>
              <SKNT2/>
              <SKNT3/>
              <BDIF3/>
              <RDIF3/>
              <HWMET/>
              <GLUPM/>
              <XRAGL/>
              <UZAWE/>
              <LOKKT/>
              <FISTL/>
              <GEBER/>
              <STBUK/>
              <TXBH2/>
              <TXBH3/>
              <PPRCT/>
              <XREF1/>
              <XREF2/>
              <KBLNR/>
              <KBLPOS/>
              <STTAX/>
              <FKBER/>
              <OBZEI/>
              <XNEGP/>
              <RFZEI/>
              <CCBTC/>
              <KKBER/>
              <EMPFB/>
              <XREF3/>
              <DTWS1/>
              <DTWS2/>
              <DTWS3/>
              <DTWS4/>
              <GRICD/>
              <GRIRG/>
              <GITYP/>
              <XPYPR/>
              <KIDNO/>
              <ABSBT/>
              <IDXSP/>
              <LINFV/>
              <KONTT/>
              <KONTL/>
              <TXDAT/>
              <AGZEI/>
              <PYCUR/>
              <PYAMT/>
              <BUPLA/>
              <SECCO/>
              <LSTAR/>
              <CESSION_KZ/>
              <PRZNR/>
              <PPDIFF/>
              <PPDIF2/>
              <PPDIF3/>
              <PENLC1/>
              <PENLC2/>
              <PENLC3/>
              <PENFC/>
              <PENDAYS/>
              <PENRC/>
              <GRANT_NBR/>
              <SCTAX/>
              <FKBER_LONG/>
              <GMVKZ/>
              <SRTYPE/>
              <INTRENO/>
              <MEASURE/>
              <AUGGJ/>
              <PPA_EX_IND/>
              <DOCLN/>
              <SEGMENT/>
              <PSEGMENT/>
              <PFKBER/>
              <HKTID/>
              <KSTAR/>
              <XLGCLR/>
              <TAXPS/>
              <PAYS_PROV/>
              <PAYS_TRAN/>
              <MNDID/>
              <XFRGE_BSEG/>
              <SQUAN/>
              <RE_BUKRS/>
              <RE_ACCOUNT/>
              <PGEBER/>
              <PGRANT_NBR/>
              <BUDGET_PD/>
              <PBUDGET_PD/>
              <J_1TPBUPL/>
              <PEROP_BEG/>
              <PEROP_END/>
              <FASTPAY/>
              <IGNR_IVREF/>
              <FMFGUS_KEY/>
              <FMXDOCNR/>
              <FMXYEAR/>
              <FMXDOCLN/>
              <FMXZEKKN/>
              <PRODPER/>
              <RECRF/>
          </item>
      </INV_DET>
  </ns0:ZFM_CUST_INV_TT>`;
  console.log("Customer Invoice Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTINVTT')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(invoiceBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Customer Invoice data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.RETURN === 0){
      console.log('Unable to fetch Customer Invoice data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//-----VENDOR PORTAL-------------

//VENDOR LOGIN
app.post('/vendorlogin',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var loginBody = `<ns0:ZVENDORLOGIN_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
  <PASSWORD>${pwd}</PASSWORD>
  <VENDORID>${id}</VENDORID>
</ns0:ZVENDORLOGIN_FM>`;
  console.log("Vendor Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/vendorauthbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(loginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch vendor login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else if(result.body.RESULT === 'FALSE' || result.body.RESULT=== ""){
      console.log('Unable to fetch vendor login data');
      res.json({ success : false, message : "Check your credentials once"});
    }
    else{
      res.status(200).json({success : true, message : "User Authenticated Successfully", data: result.body});
    }

  })

});

// VENDOR profile
app.post('/vendorprofile',(req,res)=>{
  let id = req.body.id;
  var profileBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZVENDORPROFILE_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <VENDORID>${id}</VENDORID>
  </ns0:ZVENDORPROFILE_FM>`;
  console.log("Vendor Profile Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getvendorprofilebyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(profileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Profile data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.PROFILE['VENDOR'] === ''){
      console.log('Unable to fetch Profile data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//VENDOR INVOICE LIST
app.post('/vendorinvoicelist',(req,res)=>{
  let id = req.body.id;
  var invoiceBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPIPO_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID/>
     <ID>${id}</ID>
     <PS_PDF/>
     <STATUS>VENINV</STATUS>
  </ns0:ZPIPO_FM>`;
  console.log("Vendor Invoice List Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeportaldatabyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(invoiceBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Invoice List data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.INVOICE === ""){
      console.log('Unable to fetch Vendor Invoice List data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});


//VENDOR GOODS RECEIPT
app.post('/vendorgoodsreceipt',(req,res)=>{
  let id = req.body.id;
  var goodsreceiptBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZGOODSRECEIPT_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <VENDORID>${id}</VENDORID>
  </ns0:ZGOODSRECEIPT_FM>`;
  console.log("Vendor Goods Receipt List Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getgoodsreceiptbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(goodsreceiptBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Goods receipt data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(!result.body.GOODSHEAD && !result.body.GOODSVALUE){
      console.log('Unable to fetch Vendor Goods receipt  data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//VENDOR PAYMENT
app.post('/vendorpayment',(req,res)=>{
  let id = req.body.id;
  var vendorpaymentBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPAYMENT_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <COMPANYCODE>0001</COMPANYCODE>
     <VENDORID>${id}</VENDORID>
     <T_CLOSE>
        <item>
           <COMP_CODE/>
           <VENDOR/>
           <SP_GL_IND/>
           <CLEAR_DATE/>
           <CLR_DOC_NO/>
           <ALLOC_NMBR/>
           <FISC_YEAR/>
           <DOC_NO/>
           <ITEM_NUM/>
           <PSTNG_DATE/>
           <DOC_DATE/>
           <ENTRY_DATE/>
           <CURRENCY/>
           <LOC_CURRCY/>
           <REF_DOC_NO/>
           <DOC_TYPE/>
           <FIS_PERIOD/>
           <POST_KEY/>
           <DB_CR_IND/>
           <BUS_AREA/>
           <TAX_CODE/>
           <LC_AMOUNT/>
           <AMT_DOCCUR/>
           <LC_TAX/>
           <TX_DOC_CUR/>
           <ITEM_TEXT/>
           <BRANCH/>
           <BLINE_DATE/>
           <PMNTTRMS/>
           <DSCT_DAYS1/>
           <DSCT_DAYS2/>
           <NETTERMS/>
           <DSCT_PCT1/>
           <DSCT_PCT2/>
           <DISC_BASE/>
           <DSC_AMT_LC/>
           <DSC_AMT_DC/>
           <PYMT_METH/>
           <PMNT_BLOCK/>
           <FIXEDTERMS/>
           <INV_REF/>
           <INV_YEAR/>
           <INV_ITEM/>
           <DUNN_BLOCK/>
           <DUNN_KEY/>
           <LAST_DUNN/>
           <DUNN_LEVEL/>
           <DUNN_AREA/>
           <W_TAX_CODE/>
           <W_TAX_BASE/>
           <WI_TAX_AMT/>
           <DOC_STATUS/>
           <NXT_DOCTYP/>
           <VAT_REG_NO/>
           <EXEMPT_NO/>
           <W_TAX_EXPT/>
           <REASON_CDE/>
           <PMTMTHSUPL/>
           <REF_KEY_1/>
           <REF_KEY_2/>
           <T_CURRENCY/>
           <AMOUNT/>
           <NET_AMOUNT/>
           <NAME/>
           <NAME_2/>
           <NAME_3/>
           <NAME_4/>
           <POSTL_CODE/>
           <CITY/>
           <COUNTRY/>
           <STREET/>
           <PO_BOX/>
           <POBX_PCD/>
           <POBK_CURAC/>
           <BANK_ACCT/>
           <BANK_KEY/>
           <BANK_CTRY/>
           <TAX_NO_1/>
           <TAX_NO_2/>
           <TAX/>
           <EQUAL_TAX/>
           <REGION/>
           <CTRL_KEY/>
           <INSTR_KEY/>
           <PAYEE_CODE/>
           <LANGU/>
           <BILL_LIFE/>
           <BE_TAXCODE/>
           <BILLTAX_LC/>
           <BILLTAX_FC/>
           <LC_COL_CHG/>
           <COLL_CHARG/>
           <CHGS_TX_CD/>
           <ISSUE_DATE/>
           <USAGEDATE/>
           <BILL_USAGE/>
           <DOMICILE/>
           <DRAWER/>
           <CTRBNK_LOC/>
           <DRAW_CITY1/>
           <DRAWEE/>
           <DRAW_CITY2/>
           <DISCT_DAYS/>
           <DISCT_RATE/>
           <ACCEPTED/>
           <BILLSTATUS/>
           <PRTEST_IND/>
           <BE_DEMAND/>
           <OBJ_TYPE/>
           <REF_DOC/>
           <REF_ORG_UN/>
           <REVERSAL_DOC/>
           <SP_GL_TYPE/>
           <NEG_POSTNG/>
           <REF_DOC_NO_LONG/>
        </item>
     </T_CLOSE>
     <T_OPEN>
        <item>
           <COMP_CODE/>
           <VENDOR/>
           <SP_GL_IND/>
           <CLEAR_DATE/>
           <CLR_DOC_NO/>
           <ALLOC_NMBR/>
           <FISC_YEAR/>
           <DOC_NO/>
           <ITEM_NUM/>
           <PSTNG_DATE/>
           <DOC_DATE/>
           <ENTRY_DATE/>
           <CURRENCY/>
           <LOC_CURRCY/>
           <REF_DOC_NO/>
           <DOC_TYPE/>
           <FIS_PERIOD/>
           <POST_KEY/>
           <DB_CR_IND/>
           <BUS_AREA/>
           <TAX_CODE/>
           <LC_AMOUNT/>
           <AMT_DOCCUR/>
           <LC_TAX/>
           <TX_DOC_CUR/>
           <ITEM_TEXT/>
           <BRANCH/>
           <BLINE_DATE/>
           <PMNTTRMS/>
           <DSCT_DAYS1/>
           <DSCT_DAYS2/>
           <NETTERMS/>
           <DSCT_PCT1/>
           <DSCT_PCT2/>
           <DISC_BASE/>
           <DSC_AMT_LC/>
           <DSC_AMT_DC/>
           <PYMT_METH/>
           <PMNT_BLOCK/>
           <FIXEDTERMS/>
           <INV_REF/>
           <INV_YEAR/>
           <INV_ITEM/>
           <DUNN_BLOCK/>
           <DUNN_KEY/>
           <LAST_DUNN/>
           <DUNN_LEVEL/>
           <DUNN_AREA/>
           <W_TAX_CODE/>
           <W_TAX_BASE/>
           <WI_TAX_AMT/>
           <DOC_STATUS/>
           <NXT_DOCTYP/>
           <VAT_REG_NO/>
           <EXEMPT_NO/>
           <W_TAX_EXPT/>
           <REASON_CDE/>
           <PMTMTHSUPL/>
           <REF_KEY_1/>
           <REF_KEY_2/>
           <T_CURRENCY/>
           <AMOUNT/>
           <NET_AMOUNT/>
           <NAME/>
           <NAME_2/>
           <NAME_3/>
           <NAME_4/>
           <POSTL_CODE/>
           <CITY/>
           <COUNTRY/>
           <STREET/>
           <PO_BOX/>
           <POBX_PCD/>
           <POBK_CURAC/>
           <BANK_ACCT/>
           <BANK_KEY/>
           <BANK_CTRY/>
           <TAX_NO_1/>
           <TAX_NO_2/>
           <TAX/>
           <EQUAL_TAX/>
           <REGION/>
           <CTRL_KEY/>
           <INSTR_KEY/>
           <PAYEE_CODE/>
           <LANGU/>
           <BILL_LIFE/>
           <BE_TAXCODE/>
           <BILLTAX_LC/>
           <BILLTAX_FC/>
           <LC_COL_CHG/>
           <COLL_CHARG/>
           <CHGS_TX_CD/>
           <ISSUE_DATE/>
           <USAGEDATE/>
           <BILL_USAGE/>
           <DOMICILE/>
           <DRAWER/>
           <CTRBNK_LOC/>
           <DRAW_CITY1/>
           <DRAWEE/>
           <DRAW_CITY2/>
           <DISCT_DAYS/>
           <DISCT_RATE/>
           <ACCEPTED/>
           <BILLSTATUS/>
           <PRTEST_IND/>
           <BE_DEMAND/>
           <OBJ_TYPE/>
           <REF_DOC/>
           <REF_ORG_UN/>
           <REVERSAL_DOC/>
           <SP_GL_TYPE/>
           <NEG_POSTNG/>
           <REF_DOC_NO_LONG/>
        </item>
     </T_OPEN>
  </ns0:ZPAYMENT_FM>`;
  console.log("Vendor Payment List Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getvendorpaymentbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpaymentBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Payment data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(!result.body.T_CLOSE && !result.body.T_OPEN){
      console.log('Unable to fetch Vendor Payment  data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//VENDOR CREDIT DEBIT MEMO
app.post('/vendorcreditdebit',(req,res)=>{
  let id = req.body.id;
  var vendorpurchaseorderBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZCREDITDEBIT_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <VENDORID>${id}</VENDORID>
  </ns0:ZCREDITDEBIT_FM>`;
  console.log("Vendor Credit & Debit List Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getvendorcreditdebitbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpurchaseorderBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor Credit & Debit data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(!result.body.DEBITDATA && !result.body.CREDITDATA){
      console.log('Unable to fetch Vendor Credit & Debit  data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//VENDOR RFQ 5
app.post('/vendorrfq',(req,res)=>{
  let id = req.body.id;
  var vendorrfqBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZVENDORRFQ_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <VENDORID>${id}</VENDORID>
     <RFQ_HEAD>
        <item>
           <PO_NUMBER/>
           <CO_CODE/>
           <DOC_CAT/>
           <DOC_TYPE/>
           <CNTRL_IND/>
           <DELETE_IND/>
           <STATUS/>
           <CREATED_ON/>
           <CREATED_BY/>
           <ITEM_INTVL/>
           <LAST_ITEM/>
           <VENDOR/>
           <LANGUAGE/>
           <PMNTTRMS/>
           <DSCNT1_TO/>
           <DSCNT2_TO/>
           <DSCNT3_TO/>
           <CASH_DISC1/>
           <CASH_DISC2/>
           <PURCH_ORG/>
           <PUR_GROUP/>
           <CURRENCY/>
           <EXCH_RATE/>
           <EX_RATE_FX/>
           <DOC_DATE/>
           <VPER_START/>
           <VPER_END/>
           <APPLIC_BY/>
           <QUOT_DEAD/>
           <BINDG_PER/>
           <WARRANTY/>
           <BIDINV_NO/>
           <QUOTATION/>
           <QUOT_DATE/>
           <REF_1/>
           <SALES_PERS/>
           <TELEPHONE/>
           <SUPPL_VEND/>
           <CUSTOMER/>
           <AGREEMENT/>
           <REJ_REASON/>
           <COMPL_DLV/>
           <GR_MESSAGE/>
           <SUPPL_PLNT/>
           <RCVG_VEND/>
           <INCOTERMS1/>
           <INCOTERMS2/>
           <TARGET_VAL/>
           <COLL_NO/>
           <DOC_COND/>
           <PROCEDURE/>
           <UPDATE_GRP/>
           <DIFF_INV/>
           <EXPORT_NO/>
           <OUR_REF/>
           <LOGSYSTEM/>
           <SUBITEMINT/>
           <MAST_COND/>
           <REL_GROUP/>
           <REL_STRAT/>
           <REL_IND/>
           <REL_STATUS/>
           <SUBJ_TO_R/>
           <TAXR_CNTRY/>
           <SCHED_IND/>
           <VEND_NAME/>
           <CURRENCY_ISO/>
           <EXCH_RATE_CM/>
           <HOLD/>
        </item>
     </RFQ_HEAD>
     <RFQ_VALUES>
        <item>
           <PO_NUMBER/>
           <PO_ITEM/>
           <DELETE_IND/>
           <STATUS/>
           <CHANGED_ON/>
           <SHORT_TEXT/>
           <MATERIAL/>
           <PUR_MAT/>
           <CO_CODE/>
           <PLANT/>
           <STORE_LOC/>
           <TRACKINGNO/>
           <MAT_GRP/>
           <INFO_REC/>
           <VEND_MAT/>
           <TARGET_QTY/>
           <QUANTITY/>
           <UNIT/>
           <ORDERPR_UN/>
           <CONV_NUM1/>
           <CONV_DEN1/>
           <CONV_NUM2/>
           <CONV_DEN2/>
           <NET_PRICE/>
           <PRICE_UNIT/>
           <NET_VALUE/>
           <GROS_VALUE/>
           <QUOT_DEAD/>
           <GR_PR_TIME/>
           <TAX_CODE/>
           <SETT_GRP1/>
           <QUAL_INSP/>
           <INFO_UPD/>
           <PRNT_PRICE/>
           <EST_PRICE/>
           <NUM_REMIND/>
           <REMINDER1/>
           <REMINDER2/>
           <REMINDER3/>
           <OVERDELTOL/>
           <UNLIMITED/>
           <UNDER_TOL/>
           <VAL_TYPE/>
           <VAL_CAT/>
           <REJ_IND/>
           <COMMENT/>
           <DEL_COMPL/>
           <FINAL_INV/>
           <ITEM_CAT/>
           <ACCTASSCAT/>
           <CONSUMPT/>
           <DISTRIB/>
           <PART_INV/>
           <GR_IND/>
           <GR_NON_VAL/>
           <IR_IND/>
           <GR_BASEDIV/>
           <ACKN_REQD/>
           <ACKNOWL_NO/>
           <AGREEMENT/>
           <AGMT_ITEM/>
           <RECON_DATE/>
           <AGRCUMQTY/>
           <FIRM_ZONE/>
           <TRADE_OFF/>
           <BOM_EXPL/>
           <EXCLUSION/>
           <BASE_UNIT/>
           <SHIPPING/>
           <OUTL_TARGV/>
           <NOND_ITAX/>
           <RELORD_QTY/>
           <PRICE_DATE/>
           <DOC_CAT/>
           <EFF_VALUE/>
           <COMMITMENT/>
           <CUSTOMER/>
           <ADDRESS/>
           <COND_GROUP/>
           <NO_C_DISC/>
           <UPDATE_GRP/>
           <PLAN_DEL/>
           <NET_WEIGHT/>
           <WEIGHTUNIT/>
           <TAX_JUR_CD/>
           <PRINT_REL/>
           <SPEC_STOCK/>
           <SETRESERNO/>
           <SETTLITMNO/>
           <NOT_CHGBL/>
           <CTR_KEY_QM/>
           <CERT_TYPE/>
           <EAN_UPC/>
           <CONF_CTRL/>
           <REV_LEV/>
           <FUND/>
           <FUNDS_CTR/>
           <CMMT_ITEM/>
           <BA_PARTNER/>
           <PTR_ASS_BA/>
           <PROFIT_CTR/>
           <PARTNER_PC/>
           <PRICE_CTR/>
           <GROSS_WGHT/>
           <VOLUME/>
           <VOLUMEUNIT/>
           <INCOTERMS1/>
           <INCOTERMS2/>
           <ADVANCE/>
           <PRIOR_VEND/>
           <SUB_RANGE/>
           <PCKG_NO/>
           <STATISTIC/>
           <HL_ITEM/>
           <GR_TO_DATE/>
           <SUPPL_VEND/>
           <SC_VENDOR/>
           <CONF_MATL/>
           <MAT_CAT/>
           <KANBAN_IND/>
           <ADDRESS2/>
           <INT_OBJ_NO/>
           <ERS/>
           <GRSETTFROM/>
           <LAST_TRANS/>
           <TRANS_TIME/>
           <SER_NO/>
           <PROMOTION/>
           <ALLOC_TBL/>
           <AT_ITEM/>
           <POINTS/>
           <POINTS_UN/>
           <SEASON_TY/>
           <SEASON_YR/>
           <SETT_GRP_2/>
           <SETT_GRP_3/>
           <SETT_ITEM/>
           <ML_AKT/>
           <REMSHLIFE/>
           <RFQ/>
           <RFQ_ITEM/>
           <CONFIG_ORG/>
           <QUOTAUSAGE/>
           <SPSTCK_PHY/>
           <PREQ_NO/>
           <PREQ_ITEM/>
           <MAT_TYPE/>
           <SI_CAT/>
           <SUB_ITEMS/>
           <SUBTOTAL_1/>
           <SUBTOTAL_2/>
           <SUBTOTAL_3/>
           <SUBTOTAL_4/>
           <SUBTOTAL_5/>
           <SUBTOTAL_6/>
           <SUBITM_KEY/>
           <MAX_CMG/>
           <MAX_CPGO/>
           <RET_ITEM/>
           <AT_RELEV/>
           <ORD_REAS/>
           <DEL_TYP_RT/>
           <PRDTE_CTRL/>
           <MANUF_PROF/>
           <MANU_MAT/>
           <MFR_NO/>
           <MFR_NO_EXT/>
           <ITEM_CAT_EXT/>
           <PO_UNIT_ISO/>
           <ORDERPR_UN_ISO/>
           <BASE_UOM_ISO/>
           <WEIGHTUNIT_ISO/>
           <VOLUMEUNIT_ISO/>
           <POINTS_UN_ISO/>
           <CONF_MATL_EXTERNAL/>
           <CONF_MATL_GUID/>
           <CONF_MATL_VERSION/>
           <MATERIAL_EXTERNAL/>
           <MATERIAL_GUID/>
           <MATERIAL_VERSION/>
           <PUR_MAT_EXTERNAL/>
           <PUR_MAT_GUID/>
           <PUR_MAT_VERSION/>
           <GRANT_NBR/>
           <CMMT_ITEM_LONG/>
           <FUNC_AREA_LONG/>
           <BUDGET_PERIOD/>
           <MATERIAL_LONG/>
           <PUR_MAT_LONG/>
           <CONF_MATL_LONG/>
        </item>
     </RFQ_VALUES>
  </ns0:ZVENDORRFQ_FM>`;
  console.log("Vendor RFQ Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getvendorrfqbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorrfqBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor RFQ data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }
  })

});

//VENDOR PURCHASE ORDER
app.post('/vendorpo',(req,res)=>{
  let id = req.body.id;
  var vendorpoBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPURCHASEORDER_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <VENDORID>${id}</VENDORID>
     <HEADERDATA>
        <item>
           <PO_NUMBER/>
           <CO_CODE/>
           <DOC_CAT/>
           <DOC_TYPE/>
           <CNTRL_IND/>
           <DELETE_IND/>
           <STATUS/>
           <CREATED_ON/>
           <CREATED_BY/>
           <ITEM_INTVL/>
           <LAST_ITEM/>
           <VENDOR/>
           <LANGUAGE/>
           <PMNTTRMS/>
           <DSCNT1_TO/>
           <DSCNT2_TO/>
           <DSCNT3_TO/>
           <CASH_DISC1/>
           <CASH_DISC2/>
           <PURCH_ORG/>
           <PUR_GROUP/>
           <CURRENCY/>
           <EXCH_RATE/>
           <EX_RATE_FX/>
           <DOC_DATE/>
           <VPER_START/>
           <VPER_END/>
           <APPLIC_BY/>
           <QUOT_DEAD/>
           <BINDG_PER/>
           <WARRANTY/>
           <BIDINV_NO/>
           <QUOTATION/>
           <QUOT_DATE/>
           <REF_1/>
           <SALES_PERS/>
           <TELEPHONE/>
           <SUPPL_VEND/>
           <CUSTOMER/>
           <AGREEMENT/>
           <REJ_REASON/>
           <COMPL_DLV/>
           <GR_MESSAGE/>
           <SUPPL_PLNT/>
           <RCVG_VEND/>
           <INCOTERMS1/>
           <INCOTERMS2/>
           <TARGET_VAL/>
           <COLL_NO/>
           <DOC_COND/>
           <PROCEDURE/>
           <UPDATE_GRP/>
           <DIFF_INV/>
           <EXPORT_NO/>
           <OUR_REF/>
           <LOGSYSTEM/>
           <SUBITEMINT/>
           <MAST_COND/>
           <REL_GROUP/>
           <REL_STRAT/>
           <REL_IND/>
           <REL_STATUS/>
           <SUBJ_TO_R/>
           <TAXR_CNTRY/>
           <SCHED_IND/>
           <VEND_NAME/>
           <CURRENCY_ISO/>
           <EXCH_RATE_CM/>
           <HOLD/>
        </item>
     </HEADERDATA>
     <ITEMDATA>
        <item>
           <PO_NUMBER/>
           <PO_ITEM/>
           <DELETE_IND/>
           <STATUS/>
           <CHANGED_ON/>
           <SHORT_TEXT/>
           <MATERIAL/>
           <PUR_MAT/>
           <CO_CODE/>
           <PLANT/>
           <STORE_LOC/>
           <TRACKINGNO/>
           <MAT_GRP/>
           <INFO_REC/>
           <VEND_MAT/>
           <TARGET_QTY/>
           <QUANTITY/>
           <UNIT/>
           <ORDERPR_UN/>
           <CONV_NUM1/>
           <CONV_DEN1/>
           <CONV_NUM2/>
           <CONV_DEN2/>
           <NET_PRICE/>
           <PRICE_UNIT/>
           <NET_VALUE/>
           <GROS_VALUE/>
           <QUOT_DEAD/>
           <GR_PR_TIME/>
           <TAX_CODE/>
           <SETT_GRP1/>
           <QUAL_INSP/>
           <INFO_UPD/>
           <PRNT_PRICE/>
           <EST_PRICE/>
           <NUM_REMIND/>
           <REMINDER1/>
           <REMINDER2/>
           <REMINDER3/>
           <OVERDELTOL/>
           <UNLIMITED/>
           <UNDER_TOL/>
           <VAL_TYPE/>
           <VAL_CAT/>
           <REJ_IND/>
           <COMMENT/>
           <DEL_COMPL/>
           <FINAL_INV/>
           <ITEM_CAT/>
           <ACCTASSCAT/>
           <CONSUMPT/>
           <DISTRIB/>
           <PART_INV/>
           <GR_IND/>
           <GR_NON_VAL/>
           <IR_IND/>
           <GR_BASEDIV/>
           <ACKN_REQD/>
           <ACKNOWL_NO/>
           <AGREEMENT/>
           <AGMT_ITEM/>
           <RECON_DATE/>
           <AGRCUMQTY/>
           <FIRM_ZONE/>
           <TRADE_OFF/>
           <BOM_EXPL/>
           <EXCLUSION/>
           <BASE_UNIT/>
           <SHIPPING/>
           <OUTL_TARGV/>
           <NOND_ITAX/>
           <RELORD_QTY/>
           <PRICE_DATE/>
           <DOC_CAT/>
           <EFF_VALUE/>
           <COMMITMENT/>
           <CUSTOMER/>
           <ADDRESS/>
           <COND_GROUP/>
           <NO_C_DISC/>
           <UPDATE_GRP/>
           <PLAN_DEL/>
           <NET_WEIGHT/>
           <WEIGHTUNIT/>
           <TAX_JUR_CD/>
           <PRINT_REL/>
           <SPEC_STOCK/>
           <SETRESERNO/>
           <SETTLITMNO/>
           <NOT_CHGBL/>
           <CTR_KEY_QM/>
           <CERT_TYPE/>
           <EAN_UPC/>
           <CONF_CTRL/>
           <REV_LEV/>
           <FUND/>
           <FUNDS_CTR/>
           <CMMT_ITEM/>
           <BA_PARTNER/>
           <PTR_ASS_BA/>
           <PROFIT_CTR/>
           <PARTNER_PC/>
           <PRICE_CTR/>
           <GROSS_WGHT/>
           <VOLUME/>
           <VOLUMEUNIT/>
           <INCOTERMS1/>
           <INCOTERMS2/>
           <ADVANCE/>
           <PRIOR_VEND/>
           <SUB_RANGE/>
           <PCKG_NO/>
           <STATISTIC/>
           <HL_ITEM/>
           <GR_TO_DATE/>
           <SUPPL_VEND/>
           <SC_VENDOR/>
           <CONF_MATL/>
           <MAT_CAT/>
           <KANBAN_IND/>
           <ADDRESS2/>
           <INT_OBJ_NO/>
           <ERS/>
           <GRSETTFROM/>
           <LAST_TRANS/>
           <TRANS_TIME/>
           <SER_NO/>
           <PROMOTION/>
           <ALLOC_TBL/>
           <AT_ITEM/>
           <POINTS/>
           <POINTS_UN/>
           <SEASON_TY/>
           <SEASON_YR/>
           <SETT_GRP_2/>
           <SETT_GRP_3/>
           <SETT_ITEM/>
           <ML_AKT/>
           <REMSHLIFE/>
           <RFQ/>
           <RFQ_ITEM/>
           <CONFIG_ORG/>
           <QUOTAUSAGE/>
           <SPSTCK_PHY/>
           <PREQ_NO/>
           <PREQ_ITEM/>
           <MAT_TYPE/>
           <SI_CAT/>
           <SUB_ITEMS/>
           <SUBTOTAL_1/>
           <SUBTOTAL_2/>
           <SUBTOTAL_3/>
           <SUBTOTAL_4/>
           <SUBTOTAL_5/>
           <SUBTOTAL_6/>
           <SUBITM_KEY/>
           <MAX_CMG/>
           <MAX_CPGO/>
           <RET_ITEM/>
           <AT_RELEV/>
           <ORD_REAS/>
           <DEL_TYP_RT/>
           <PRDTE_CTRL/>
           <MANUF_PROF/>
           <MANU_MAT/>
           <MFR_NO/>
           <MFR_NO_EXT/>
           <ITEM_CAT_EXT/>
           <PO_UNIT_ISO/>
           <ORDERPR_UN_ISO/>
           <BASE_UOM_ISO/>
           <WEIGHTUNIT_ISO/>
           <VOLUMEUNIT_ISO/>
           <POINTS_UN_ISO/>
           <CONF_MATL_EXTERNAL/>
           <CONF_MATL_GUID/>
           <CONF_MATL_VERSION/>
           <MATERIAL_EXTERNAL/>
           <MATERIAL_GUID/>
           <MATERIAL_VERSION/>
           <PUR_MAT_EXTERNAL/>
           <PUR_MAT_GUID/>
           <PUR_MAT_VERSION/>
           <GRANT_NBR/>
           <CMMT_ITEM_LONG/>
           <FUNC_AREA_LONG/>
           <BUDGET_PERIOD/>
           <MATERIAL_LONG/>
           <PUR_MAT_LONG/>
           <CONF_MATL_LONG/>
        </item>
     </ITEMDATA>
     <PURCHORDER>
        <item>
           <MANDT/>
           <EBELN/>
           <EBELP/>
           <ZEKKN/>
           <VGABE/>
           <GJAHR/>
           <BELNR/>
           <BUZEI/>
           <BEWTP/>
           <BWART/>
           <BUDAT/>
           <MENGE/>
           <BPMNG/>
           <DMBTR/>
           <WRBTR/>
           <WAERS/>
           <AREWR/>
           <WESBS/>
           <BPWES/>
           <SHKZG/>
           <BWTAR/>
           <ELIKZ/>
           <XBLNR/>
           <LFGJA/>
           <LFBNR/>
           <LFPOS/>
           <GRUND/>
           <CPUDT/>
           <CPUTM/>
           <REEWR/>
           <EVERE/>
           <REFWR/>
           <MATNR/>
           <WERKS/>
           <XWSBR/>
           <ETENS/>
           <KNUMV/>
           <MWSKZ/>
           <LSMNG/>
           <LSMEH/>
           <EMATN/>
           <AREWW/>
           <HSWAE/>
           <BAMNG/>
           <CHARG/>
           <BLDAT/>
           <XWOFF/>
           <XUNPL/>
           <ERNAM/>
           <SRVPOS/>
           <PACKNO/>
           <INTROW/>
           <BEKKN/>
           <LEMIN/>
           <AREWB/>
           <REWRB/>
           <SAPRL/>
           <MENGE_POP/>
           <BPMNG_POP/>
           <DMBTR_POP/>
           <WRBTR_POP/>
           <WESBB/>
           <BPWEB/>
           <WEORA/>
           <AREWR_POP/>
           <KUDIF/>
           <RETAMT_FC/>
           <RETAMT_LC/>
           <RETAMTP_FC/>
           <RETAMTP_LC/>
           <XMACC/>
           <WKURS/>
           <INV_ITEM_ORIGIN/>
           <VBELN_ST/>
           <VBELP_ST/>
           <SGT_SCAT/>
           <ET_UPD/>
           <J_SC_DIE_COMP_F/>
           <FSH_SEASON_YEAR/>
           <FSH_SEASON/>
           <FSH_COLLECTION/>
           <FSH_THEME/>
           <WRF_CHARSTC1/>
           <WRF_CHARSTC2/>
           <WRF_CHARSTC3/>
        </item>
     </PURCHORDER>
  </ns0:ZPURCHASEORDER_FM>`;
  console.log("Vendor PO Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getvendorpurchaseorderbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(vendorpoBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Vendor PO data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }
  })

});

//-----EMPLOYEE PORTAL-------------
//EMPLOGIN
app.post('/emplogin',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var emploginBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZEMPLOGIN_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID>${id}</EMPID>
     <PASSWORD>${pwd}</PASSWORD>
  </ns0:ZEMPLOGIN_FM>`;
  console.log("Employee Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeauthbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(emploginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Emp login data');
      res.json({ success : false, message : "Check your credentials once"});
    }else if(result.body.RESULT === 'WRONG CREDENTIALS'){
      console.log('Unable to fetch Emp Login data');
      res.json({ success : false, message : "Check your credentials once"});
    }
    else{
      res.status(200).json({success : true, message : "User Authenticated Successfully", data: result.body});
    }

  })

});

//Employee profile
app.post('/empprofile',(req,res)=>{
  let id = req.body.id;
  var empprofileBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPIPO_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID>${id}</EMPID>
     <ID/>
     <PS_PDF/>
     <STATUS>EP</STATUS>
  </ns0:ZPIPO_FM>`;
  console.log("Employee Profile Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeportaldatabyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(empprofileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch Employee Profile data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else if(result.body.EMPDATA['PERNR'] === '00000000'){
      console.log('Unable to fetch Profile data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});

//EMPLOYEE PAYSLIP LIST
app.post('/payslip',(req,res)=>{
  let id = req.body.id;
  var payslipBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPIPO_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID>${id}</EMPID>
     <ID/>
     <PS_PDF/>
     <STATUS>PS</STATUS>
  </ns0:ZPIPO_FM>`;
  console.log("Employee Payslip Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeportaldatabyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(payslipBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else if(result.body.PAYSLIP_DET === ''){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});



//EMPLOYEE PRINT PAYSLIP
app.post('/printpayslip',(req,res)=>{
  let id = req.body.id;
  let seqence = req.body.sequence;
  var payDetailBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPIPO_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID>${id}</EMPID>
     <PS_PDF>${seqence}</PS_PDF>
     <STATUS>PSPDF</STATUS>
  </ns0:ZPIPO_FM>`;
  console.log("Employee Payslip Detail Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeportaldatabyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(payDetailBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else if(result.body.PAYSLIP_HTML === ''){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

}
)

//EMPLOYEE Leave Request LIST
app.post('/leavereq',(req,res)=>{
  let id = req.body.id;
  var leavereqBody = `<?xml version="1.0" encoding="UTF-8"?>
  <ns0:ZPIPO_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions">
     <EMPID>${id}</EMPID>
     <PS_PDF></PS_PDF>
     <STATUS>LD</STATUS>
  </ns0:ZPIPO_FM>`;
  console.log("Employee Leave Request Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/employeeportaldatabyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(leavereqBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }
    else if(result.body.IT_LEAVE_DETAIL === ''){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      res.status(200).json({success : true, message : "Records fetched Successfully", data: result.body});
    }

  })

});


//IF NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
      success: false,
      message: "Page not found"
  })
});
