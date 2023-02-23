import { utils, writeFile } from 'xlsx';
function ExportExcel(data) {
    try {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Sheet1");
        writeFile(workbook, `current.xlsx`);
    } catch (error) {
        window.alert("error", error)
    }
}

export default ExportExcel;