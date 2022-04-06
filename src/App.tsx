import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { chartData } from "./chartData";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart); // 차트 생성
    chart.data = chartData; // 차트 데이터 주입

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis()); //X축 생성
    categoryAxis.dataFields.category = "pathogenCode"; // X축에 쓸 데이터 카테고리

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis()); //Y축 생성
    valueAxis.title.text = "Number of Positive Cases (n)"; // Y축 이름

    // 범례 공틍?
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right"; // 범례 위치 조정
    chart.legend.maxHeight = 150; // 범례 최대높이 지정
    chart.legend.scrollable = true; // 범례 최대높이 지정 후 스크롤 사용 가능
    chart.legend.maxWidth = 300; // 범례 너비, 너비제한이 없다면 undefined;
    chart.legend.useDefaultMarker = true; // 기본 정사각형 마커 사용
    // chart.legend.labels.template.text = "Series: [bold {color}]{name}[/]"; // 범례 템플릿
    // 기본 마커 스타일링
    /*let marker: any = chart.legend.markers.template.children.getIndex(0); // 기본 마커 생성
     marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc"); */

    // 커스텀 마커
    let marker = chart.legend.markers.template;
    marker.disposeChildren(); // 마커 현재 템플릿 삭제
    let customMarker = marker.createChild(am4core.Image); // 마커에 새로운 템플릿 이미지 객체 추가
    customMarker.width = 40;
    customMarker.height = 40;
    customMarker.verticalCenter = "top";
    customMarker.horizontalCenter = "left";
    customMarker.href =
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMXB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgd2lkdGg9IjIxcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZS8+PGRlc2MvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJCdXNpbmVzcy1JY29uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3Ny4wMDAwMDAsIC0yMjcuMDAwMDAwKSI+PGcgaWQ9IkNvaW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3NS4wMDAwMDAsIDIyNS4wMDAwMDApIj48cmVjdCBoZWlnaHQ9IjI1IiBpZD0iUmVjdGFuZ2xlLTQ5IiB3aWR0aD0iMjUiIHg9IjAiIHk9IjAiLz48ZyBpZD0iR3JvdXAtMzQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMC41LDIxIEM0LjcwMTAxMDEzLDIxIDAsMTYuMjk4OTg5OSAwLDEwLjUgQzAsNC43MDEwMTAxMyA0LjcwMTAxMDEzLDAgMTAuNSwwIEMxNi4yOTg5ODk5LDAgMjEsNC43MDEwMTAxMyAyMSwxMC41IEMyMSwxNi4yOTg5ODk5IDE2LjI5ODk4OTksMjEgMTAuNSwyMSBaIE0xMC41LDE4IEMxNC42NDIxMzU2LDE4IDE4LDE0LjY0MjEzNTYgMTgsMTAuNSBDMTgsNi4zNTc4NjQzOCAxNC42NDIxMzU2LDMgMTAuNSwzIEM2LjM1Nzg2NDM4LDMgMyw2LjM1Nzg2NDM4IDMsMTAuNSBDMywxNC42NDIxMzU2IDYuMzU3ODY0MzgsMTggMTAuNSwxOCBaIiBmaWxsPSIjM0I1QUZCIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGlkPSJDb21iaW5lZC1TaGFwZSIvPjxwYXRoIGQ9Ik0xMC41LDE3IEM2LjkxMDE0OTEzLDE3IDQsMTQuMDg5ODUwOSA0LDEwLjUgQzQsNi45MTAxNDkxMyA2LjkxMDE0OTEzLDQgMTAuNSw0IEMxNC4wODk4NTA5LDQgMTcsNi45MTAxNDkxMyAxNywxMC41IEMxNywxNC4wODk4NTA5IDE0LjA4OTg1MDksMTcgMTAuNSwxNyBaIE0xMSw4IEwxMSw3LjUgQzExLDcuMjIzODU3NjMgMTAuNzc2MTQyNCw3IDEwLjUsNyBDMTAuMjIzODU3Niw3IDEwLDcuMjIzODU3NjMgMTAsNy41IEwxMCw4IEw5LjUxMzk0NTIsOCBDOC42ODU1MTgwNyw4IDguMDEzOTQ1Miw4LjY3MTU3Mjg4IDguMDEzOTQ1Miw5LjUgTDguMDEzOTQ1MiwxMC4wMDA3NTY3IEM4LjAxMzk0NTIsMTAuODI5MTgzOCA4LjY4NTUxODA3LDExLjUwMDc1NjcgOS41MTM5NDUyLDExLjUwMDc1NjcgTDExLjUwMDAwNDksMTEuNTAwNzU2NyBDMTEuNzc2MTQ3MywxMS41MDA3NTY3IDEyLjAwMDAwNDksMTEuNzI0NjE0MyAxMi4wMDAwMDQ5LDEyLjAwMDc1NjcgTDEyLjAwMDAwNDksMTIuNSBDMTIuMDAwMDA0OSwxMi43NzYxNDI0IDExLjc3NjE0NzMsMTMgMTEuNTAwMDA0OSwxMyBMOS4wMTIyNTUyNSwxMyBDOC45OTE2NzA0LDEyLjc0OTgzOSA4Ljc4NTk3ODE2LDEyLjU0OTY2OCA4LjUyOTE0NDQyLDEyLjU0MTg1NyBDOC4yNTMxMjk2NiwxMi41MzM0NjI3IDguMDIyNTcwNTcsMTIuNzUwNDEyIDguMDE0MTc2MjcsMTMuMDI2NDI2OCBMOC4wMDAyMzU5NywxMy40ODQ4MDA4IEM3Ljk5MTY2MDY0LDEzLjc2Njc2ODIgOC4yMTc5MDcwOCwxNCA4LjUwMDAwNDksMTQgTDEwLDE0IEwxMCwxNC40OTEyNDE1IEMxMCwxNC43NjczODM4IDEwLjIyMzg1NzYsMTQuOTkxMjQxNSAxMC41LDE0Ljk5MTI0MTUgQzEwLjc3NjE0MjQsMTQuOTkxMjQxNSAxMSwxNC43NjczODM4IDExLDE0LjQ5MTI0MTUgTDExLDE0IEwxMS41MDAwMDQ5LDE0IEMxMi4zMjg0MzIsMTQgMTMuMDAwMDA0OSwxMy4zMjg0MjcxIDEzLjAwMDAwNDksMTIuNSBMMTMuMDAwMDA0OSwxMi4wMDA3NTY3IEMxMy4wMDAwMDQ5LDExLjE3MjMyOTYgMTIuMzI4NDMyLDEwLjUwMDc1NjcgMTEuNTAwMDA0OSwxMC41MDA3NTY3IEw5LjUxMzk0NTIsMTAuNTAwNzU2NyBDOS4yMzc4MDI4MiwxMC41MDA3NTY3IDkuMDEzOTQ1MiwxMC4yNzY4OTkxIDkuMDEzOTQ1MiwxMC4wMDA3NTY3IEw5LjAxMzk0NTIsOS41IEM5LjAxMzk0NTIsOS4yMjM4NTc2MyA5LjIzNzgwMjgyLDkgOS41MTM5NDUyLDkgTDExLjk2Nzk1NTksOSBDMTIuMDIyMjIwMyw5LjIxNzQ0NzMzIDEyLjIxODg0ODEsOS4zNzg1NDAwNCAxMi40NTMxMDEsOS4zNzg1NDAwNCBDMTIuNzI5MjQzNCw5LjM3ODU0MDA0IDEyLjk1MzEwMSw5LjE1NDY4MjQxIDEyLjk1MzEwMSw4Ljg3ODU0MDA0IEwxMi45NTMxMDEsOC41IEMxMi45NTMxMDEsOC4yMjM4NTc2MyAxMi43MjkyNDM0LDggMTIuNDUzMTAxLDggTDExLDggWiIgZmlsbD0iIzQ0RDVFOSIgaWQ9IkNvbWJpbmVkLVNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+";

    // bar차트
    let series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.valueY = "allPositiveCasesCount"; // Y축 데이터 키값 설정
    series.dataFields.categoryX = "pathogenCode"; // X축 카테고리 키값 설정 overWriting?

    series.name = "Sales"; // 차트 이름
    series.columns.template.tooltipText =
      "Series: {name}\nCategory: {categoryX}\nValue: {valueY}"; // 툴팁 템플릿
    series.columns.template.fill = am4core.color("#104547"); // fill 툴팁 색상
    series.stacked = true;

    series.events.on("ready", () => {
      let legenddata: {
        name: string;
        /* fill: any; */
      }[] = [];
      series.columns.each((column) => {
        console.log(column.dataItem); // column.dataItem?.categories.categoryX
        legenddata.push({
          name: column.dataItem?.categories.categoryX as string,
          /*  fill: column.fill, */
        });
      });
      chart.legend.data = legenddata;
    });

    /* // Line차트
    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Units";
    series2.stroke = am4core.color("#CDA2AB");
    series2.strokeWidth = 3;
    series2.dataFields.valueY = "visites";
    series2.dataFields.categoryX = "country";
    series2.stacked = true; */
  }, []);

  return (
    <div className="App">
      <div id="chartdiv" style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default App;
