import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/layouts/page-layout';
import PrimaryBtn from '../../components/buttons/primary-btn';
import styles from './recruiter.module.scss';
import CompanyCard from '../../components/recruiter-components/company-card';
import axios from 'axios';
import baseURL from '../../service/constant';
import { NavLink } from 'react-router-dom';
import EditCompany from '../../components/edit/edit-company';

const Companies = () => {
  const [company, setCompany] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const openEditCompany = (company) => {
    setSelectedCompany(company);
    setShowEdit(true);
  };

  const closeEditCompany = () => {
    setShowEdit(false);
    setSelectedCompany(null);
  };

  const getCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${baseURL}/company/api/get-company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response?.data?.data;
      console.log(data);
      
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseURL}/company/api/del-company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompany((prevCompany) => prevCompany.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <PageLayout>
      <section className={`${styles.section_container} container`}>
        <div className={`${styles.btn_div}`}>
          <NavLink to={'/recruiter/add-company'}>
            <div style={{ width: '200px' }}>
              <PrimaryBtn>
                Add Company
              </PrimaryBtn>
            </div>
          </NavLink>
        </div>

        {loading ? (
          <p>Loading companies...</p>
        ) : (
          <>
            <table className={`${styles.adminTableContainer}`}>
              <thead className={`${styles.adminTable}`}>
                <tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {company.map((item) => (
                  <CompanyCard
                    key={item._id}
                    img={item.logo}
                    name={item.name}
                    date={item?.createdAt}
                    del={() => deleteCompany(item._id)}
                    edit={() => openEditCompany(item)}
                  />
                ))}
              </tbody>
            </table>
            <p className={`${styles.footer_line}`}>A list of your registered companies</p>
          </>
        )}

        {showEdit && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <EditCompany company={selectedCompany} onClose={closeEditCompany} />
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Companies;
