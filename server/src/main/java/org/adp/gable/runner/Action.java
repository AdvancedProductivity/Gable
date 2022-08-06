package org.adp.gable.runner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * @author zzq
 */
public interface Action {

    /**
     * execute unit test
     *
     * @param in       in param
     * @param out      out param
     * @param instance instance var
     * @param global   global var
     */
    void execute(JsonNode in, JsonNode out, ObjectNode instance, ObjectNode global);

}
