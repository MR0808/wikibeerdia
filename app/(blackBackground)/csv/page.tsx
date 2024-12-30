import db from "@/lib/db";

const DownloadCSV = async () => {
    const convertToCSV = (
        objArray: {
            parentStyle: String;
            style: String;
            subStyle: String;
        }[]
    ) => {
        const array =
            typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
        let str = "";

        for (let i = 0; i < array.length; i++) {
            let line = "";
            for (let index in array[i]) {
                if (line !== "") line += ",";

                line += array[i][index];
            }
            str += line + "\r\n";
        }
        return str;
    };

    const downloadCSV = async () => {
        const allStyles: {
            parentStyle: String;
            style: String;
            subStyle: String;
        }[] = [];
        const parents = await db.parentStyle.findMany();

        for (const parent of parents) {
            const styles = await db.style.findMany({
                where: { parentStyleId: parent.id }
            });
            for (const style of styles) {
                const subStyles = await db.subStyle.findMany({
                    where: { styleId: style.id }
                });
                for (const subStyle of subStyles) {
                    allStyles.push({
                        parentStyle: parent.name,
                        style: style.name,
                        subStyle: subStyle.name
                    });
                }
            }
        }

        const csvData = new Blob([convertToCSV(allStyles)], {
            type: "text/csv"
        });
        return allStyles;
    };

    const styles = await downloadCSV();

    return (
        <div>
            <table>
                <thead>
                    <th>parent</th>
                    <th>style</th>
                    <th>substyle</th>
                </thead>
                <tbody>
                    {styles.map((style, index) => {
                        return (
                            <tr key={index}>
                                <td>{style.parentStyle}</td>
                                <td>{style.style}</td>

                                <td>{style.subStyle}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    return (
        <div className="mt-64">
            <h1>Download CSV Example</h1>
            <DownloadCSV />
        </div>
    );
};

export default App;
