import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { chartData } from "./chartData";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    let chart: am4charts.XYChart = am4core.create(
      "chartdiv",
      am4charts.XYChart
    );
    chart.data = chartData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "visites solid (M)";

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visites";
    series.dataFields.categoryX = "country";

    series.name = "Sales";
    series.columns.template.tooltipText =
      "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    series.columns.template.fill = am4core.color("#104547"); // fill
    series.dataFields.valueY = "visites";
    series.dataFields.categoryX = "country";
    series.stacked = true;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Units";
    series2.stroke = am4core.color("#CDA2AB");
    series2.strokeWidth = 3;
    series2.dataFields.valueY = "visites";
    series2.dataFields.categoryX = "country";
    series2.stacked = true;
  }, []);

  return (
    <div className="App">
      <div id="chartdiv" style={{ width: "50%", height: "300px" }} />
    </div>
  );
};

export default App;
