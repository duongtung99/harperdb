import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr'

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '../styles/Home.module.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const router = useRouter();
  const { data = {}, error } = useSWR('/api/all-products', fetcher)
  const { products } = data;

  return (
    <Layout>
      <Head>
        <title>SpaceM Store</title>
        <meta name="description" content="Apparel that's out of this world!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="sr-only">SpaceM Store</h1>

      <Section>
        <Container className={styles.actionsContainer}>
          <Button href="/products/add">Add Product</Button>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Products</h2>

          <ul className={styles.products}>
            {Array.isArray(products) && products.map(product => {
              const paramsString = Object.keys(product).map(key => `${key}=${product[key]}`).join('&');
              return (
                <div className={styles.abc}>
                <li key={product.sku}>
                  <Image width="600" height="600" src={product.image} alt="" />
                  <h3 className={styles.productsTitle}>
                    { product.title }
                  </h3>
                  <p>
                    ${ product.price }
                  </p>
                  <p className={styles.productActions}>
                    <Button className={styles.productButton} href={`/products/update?${paramsString}`}>Update</Button>
                    <Button className={styles.productButton} color="red" href={`/products/delete?${paramsString}`}>Delete</Button>
                  </p>
                </li>
                </div>
              )
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  )
}