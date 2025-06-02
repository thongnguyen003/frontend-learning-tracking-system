import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({
    students: 0,
    teachers: 0,
    admins: 0,
  });
  const [visitCountsByClass, setVisitCountsByClass] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    const checkResponse = async (res, endpoint) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}\nResponse: ${text.slice(0, 100)}`);
      }
      return res.json();
    };

    const fetchStats = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
        const headers = { Authorization: `Bearer ${token}` };
        const [studentsRes, teachersRes, adminsRes, visitsByClassRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/students`, { headers }),
          fetch(`${BASE_URL}/api/admin/teachers`, { headers }),
          fetch(`${BASE_URL}/api/admin/admins`, { headers }),
          fetch(`${BASE_URL}/api/student-visits-by-class`, { headers }),
        ]);

        const studentsData = await checkResponse(studentsRes, '/admin/students');
        const teachersData = await checkResponse(teachersRes, '/admin/teachers');
        const adminsData = await checkResponse(adminsRes, '/admin/admins');
        const visitsByClassData = await checkResponse(visitsByClassRes, '/student-visits-by-class');
        console.log('Visits By Class Data:', visitsByClassData);

        setUserStats({
          students: studentsData.total || 0,
          teachers: teachersData.total || 0,
          admins: adminsData.total || 0,
        });
        setVisitCountsByClass(visitsByClassData.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading admin dashboard...</div>;
  if (error) return <div>Error loading dashboard: {error}</div>;

  const userChartOptions = {
    data: [
      { label: 'Students', value: userStats.students },
      { label: 'Teachers', value: userStats.teachers },
      { label: 'Admins', value: userStats.admins },
    ],
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'label',
        calloutLabelKey: 'label',
        calloutLabel: {
          color: '#000',
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'User Distribution',
      fontSize: 18,
    },
  };

  const visitByClassChartOptions = {
    data: visitCountsByClass.map(item => ({ label: item.class_name, value: item.visit_count })),
    series: [
      {
        type: 'bar',
        xKey: 'label',
        yKey: 'value',
        label: {
          enabled: true,
        },
      },
    ],
    title: {
      text: 'Student Visits by Class',
      fontSize: 18,
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', minWidth: '500px' }}>
          <AgCharts options={userChartOptions} />
        </div>
        <div style={{ flex: '1 1 300px', minWidth: '500px' }}>
          <AgCharts options={visitByClassChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
