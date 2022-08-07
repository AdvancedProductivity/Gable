package org.adp.gable.api.entity;

import lombok.Data;
import org.adp.gable.common.entity.BaseEntity;
import org.hibernate.annotations.Comment;

import javax.persistence.*;

/**
 * @author zzq
 */
@Data
@Entity(name = "api_http")
@org.hibernate.annotations.Table(appliesTo = "api_http", comment = "api http detail. api http 信息表")
@javax.persistence.Table(name = "api_http", indexes = {
        @Index(name = "idx_api_http_dateCreated", columnList = "date_created", unique = false)
})
public class HttpApi extends BaseEntity {

    @Id
    @SequenceGenerator(
            name = "api_http_sequence"
            , sequenceName = "api_http_sequence"
            , allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "api_http_sequence"
    )
    private Long id;


    @Column(
            name = "protocol",
            columnDefinition = "varchar(10)",
            nullable = false
    )
    @Comment("http protocol http/https")
    private String protocol;


    @Column(
            name = "method",
            columnDefinition = "varchar(32)",
            nullable = false
    )
    @Comment("http method get/post/custom")
    private String method;


    @Column(
            name = "host",
            columnDefinition = "varchar(64)",
            nullable = false
    )
    @Comment("http host ip/domain name")
    private String host;


    @Column(
            name = "host_arr",
            columnDefinition = "text",
            nullable = false
    )
    @Comment("http host array type")
    private String hostArr;


    @Column(
            name = "port",
            columnDefinition = "varchar(16)",
            nullable = false
    )
    @Comment("http port default 80")
    private String port;


    @Column(
            name = "path",
            columnDefinition = "varchar(512)",
            nullable = true
    )
    @Comment("http path")
    private String path;


    @Column(
            name = "path_array",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http path array type")
    private String pathArray;


    @Column(
            name = "url",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http url")
    private String url;


    @Column(
            name = "query",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http query key-value  json type")
    private String query;


    @Column(
            name = "header",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http header key-value json type")
    private String header;

    @Column(
            name = "body_type",
            columnDefinition = "varchar(12)",
            nullable = true
    )
    @Comment("http body none/url-encoded/form-data/raw/graphql")
    private String bodyType;

    @Column(
            name = "body_form",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http body form key-value json type")
    private String bodyForm;


    @Column(
            name = "body_url_encoded",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http body url-encoded key-value json type")
    private String bodyUrlEncoded;


    @Column(
            name = "body_text",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http body text json/xml/html/text...")
    private String bodyText;


    @Column(
            name = "body_text_type",
            columnDefinition = "varchar(12)",
            nullable = true
    )
    @Comment("http body none/url-encoded/form-data/raw/graphql")
    private String bodyTextType;


    @Column(
            name = "body_graph_ql_query",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http body graphQl Query String part")
    private String bodyGraphQlQuery;


    @Column(
            name = "body_graph_ql_data",
            columnDefinition = "text",
            nullable = true
    )
    @Comment("http body graphQl data part")
    private String bodyGraphQlVar;


    @Column(
            name = "version",
            columnDefinition = "bigint default null",
            nullable = true
    )
    @Comment("http define version.is also api define table version")
    private Long version;
}
