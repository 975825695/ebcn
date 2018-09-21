/*
 * @Author: jorce 
 * @Date: 2018-09-13 10:23:48 
 * @Last Modified by: jorce
 * @Last Modified time: 2018-09-21 13:56:24
 */
export default {
    exportExcel: function (filename, val, excelTitle, exclude) {
        var excludelist = [];
        if (exclude) {
            excludelist = exclude.split(',');
        }
        var explorer = ''; //浏览器类型
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            explorer = 'ie';
        //IE浏览器导出
        if (explorer == 'ie') {
            var arrData = typeof val != 'object' ? JSON.parse(val) : val;
            try {
                var oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
            } catch (e) {
                alert("无法启动Excel，请确保电脑中已经安装了Excel!\n\n如果已经安装了Excel，" + "请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → ActiveX 控件和插件 → 对未标记为可安全执行脚本的ActiveX 控件初始化并执行脚本 → 启用 → 确定");
            }
            var oWB = oXL.Workbooks.Add(); //获取workbook对象
            var oSheet = oWB.ActiveSheet; //激活当前sheet
            var Lenr = arrData.length; //取得表格行数
            for (var i = 0; i < excelTitle.length; i++) {
                oSheet.Cells(1, i + 1).value = excelTitle[i]; //赋值
            }


            for (var i = 0; i < Lenr; i++) {
                var td = 0;
                for (var j in arrData[i]) {
                    if (excludelist.length > 0 && excludelist.indexOf(j) >= 0) continue;
                    oSheet.Cells(i + 2, td + 1).value = arrData[i][j]; //赋值
                    td++;
                }
            }
            oXL.Visible = true;

            var fname = oXL.Application.GetSaveAsFilename(filename + ".xls", "Excel Spreadsheets (*.xls), *.xls");
            oWB.SaveAs(fname);
            oWB.Close();
            oXL.Quit();
        }
        //非IE浏览器导出
        else {
            var arrData = typeof val != 'object' ? JSON.parse(val) : val;
            var excel = '<table>';
            var row = "<tr>";
            for (var i = 0; i < excelTitle.length; i++) {
                row += "<td>" + excelTitle[i] + "</td>";
            }
            excel += row + "</tr>";
            for (var i = 0; i < arrData.length; i++) {
                var row = "<tr>";
                for (var j in arrData[i]) {
                    if (excludelist.length > 0 && excludelist.indexOf(j) >= 0) continue;
                    var td = arrData[i][j];
                    row += "<td>" + td + "</td>";
                }
                excel += row + "</tr>";
            }
            excel += "</table>";
            var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                "xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
            excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
            excelFile += '; charset=UTF-8">';
            excelFile += "<head>";
            excelFile += "<!--[if gte mso 9]>";
            excelFile += "<xml>";
            excelFile += "<x:ExcelWorkbook>";
            excelFile += "<x:ExcelWorksheets>";
            excelFile += "<x:ExcelWorksheet>";
            excelFile += "<x:Name>";
            excelFile += "sheet";
            excelFile += "</x:Name>";
            excelFile += "<x:WorksheetOptions>";
            excelFile += "<x:DisplayGridlines/>";
            excelFile += "</x:WorksheetOptions>";
            excelFile += "</x:ExcelWorksheet>";
            excelFile += "</x:ExcelWorksheets>";
            excelFile += "</x:ExcelWorkbook>";
            excelFile += "</xml>";
            excelFile += "<![endif]-->";
            excelFile += "</head>";
            excelFile += "<body>";
            excelFile += excel;
            excelFile += "</body>";
            excelFile += "</html>";
            var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            //导出文件名
            link.download = filename + ".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    convertObjToParams: function (obj) {
        var param = new URLSearchParams();
        for (var key in obj) {
            param.append(key, obj[key]);
        }
        return param;
    },
}