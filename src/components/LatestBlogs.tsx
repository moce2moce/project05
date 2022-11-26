import React from "react";

export interface BlogInterface {
  id: string;
  title: string;
  published: string;
  excerpt: string;
  image: string;
}

interface Props {
  latestBlogs: BlogInterface[];
}

const LatestBlogs: React.FC<Props> = ({ latestBlogs }) => {
  return (
    <section className="from-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title from-blog__title">
              <h2>From The Blog</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {latestBlogs.map(b => (
            <div key={b.id} className="col-lg-4 col-md-4 col-sm-6">
              <a href="#" className="blog__item">
                <div className="blog__item__pic">
                  <img src={b.image} alt="" height={300} />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o"></i> {b.published}
                    </li>
                  </ul>
                  <h5>{b.title}</h5>
                  <p>{b.excerpt}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
