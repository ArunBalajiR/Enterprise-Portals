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



// LOGIN
app.post('/login',(req,res)=>{
  let id = req.body.id;
  let pwd = req.body.password;
  var loginBody = `<?xml version="1.0" encoding="UTF-8"?><ns0:ZCUSTOMERLOGIN_FM xmlns:ns0="urn:sap-com:document:sap:rfc:functions"><CUSTOMERID>${id}</CUSTOMERID><PASSWORD>${pwd}</PASSWORD></ns0:ZCUSTOMERLOGIN_FM>`;
  console.log("Login Call")
  var req = unirest('POST','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/loginbyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(loginBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "Check your credentials once"});
    }else if(result.body.STATUS == 'INVALID'){
      console.log('Unable to fetch data');
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
  console.log("Profile Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/getprofilebyarun')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(profileBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.PROFILE['KUNNR'] === ''){
      console.log('Unable to fetch data');
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
      console.log(result.body);
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
  console.log("Invoice Call");
  var req = unirest('GET','http://dxktpipo.kaarcloud.com:50000/RESTAdapter/CUSTINVTT')
  .headers({
    'Authorization' : 'Basic UE9VU0VSQDE6VGVjaEAyMDIy',
    'Content-Type' : 'text/xml'
  })
  .send(invoiceBody)
  .end(function(result){
    if(result.error){
      console.log('Unable to fetch data');
      console.log(result.body);
      res.json({ success : false, message : "No records found"});
    }else if(result.body.RETURN === 0){
      console.log('Unable to fetch data');
      res.json({ success : false, message : "No records found"});
    }
    else{
      console.log(result.body);
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
