import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { FilterData, PieChartConfig, SalesByPaymentMethod, SalesByStore } from './types';
import { buildFilterParams, makeRequest } from './utils/request';
import { buildSalesByPaymentMethod, buildSalesByStoreChart } from './helpers';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();

  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByStore[]>('/sales/by-store', { params })
      .then((response) => {
        const newSalesByStore = buildSalesByStoreChart(response.data);
        setSalesByStore(newSalesByStore);
      })
      .catch(() => {
        console.log('Error to fetch sales by store');
      });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        const newSalesByPaymentMethod = buildSalesByPaymentMethod(response.data);
        setSalesByPaymentMethod(newSalesByPaymentMethod);
      })
      .catch(() => {
        console.log('Error to fetch sales by payment method');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
    console.log({ filter });
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <SalesByDate filterData={filterData} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
          <PieChartCard name="Lojas" labels={salesByStore?.labels} series={salesByStore?.series} />
          <PieChartCard
            name="Pagamento"
            labels={salesByPaymentMethod?.labels}
            series={salesByPaymentMethod?.series}
          />
        </div>
        <SalesTable filterData={filterData} />
      </div>
    </>
  );
}

export default App;
